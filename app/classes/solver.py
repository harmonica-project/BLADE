# coding: utf-8

from . import bdd
import numpy as np
from topsis import topsis
from app.classes.bdd import Bdd

class Solver:
    attributes_cars = [
        ("public", 1),
        ("permissionned", 1),
        ("nativeDataEncryption", 1),
        ("throughput", 1),
        ("latency", 0),
        ("energySaving", 1),
        ("byzantineProof", 1),
        ("smartContract", 1),
        ("cryptocurrency", 1),
        ("storageElt", 1),
        ("computationalElt", 1),
        ("assetMgElt", 1),
        ("softwareConnectorElt", 1),
        ("learningCurve", 0)
    ]

    def __init__(self, weights, requirements):
        self.new(weights, requirements)

    def new(self, weights, requirements):
        self.alternatives_values = []
        self.costs = []
        self.abst_attrs_values = []

        self.alternatives = self.get_alternatives()
        self.weights = weights
        self.requirements = requirements

        self.results = {
            'disqualified': [],
            'considered': [],
            'optimum_id': None
        }
    
    def get_alternatives(self):
        bdd = Bdd()
        bdd.connect()
        alternatives = list(bdd.db.blockchains.find())
        bdd.disconnect()
        return alternatives

    def get_abst_attrs_values(self):
        bdd = Bdd()
        bdd.connect()
        abst_attrs_values = list(bdd.db.abstAttrsValues.find())
        bdd.disconnect()
        return abst_attrs_values

    def format_value(self, value):
        for attr in self.abst_attrs_values:
            if attr["name"] == value:
                return attr["value"]
        return value

    def format_blockchains_alts(self):
        first = True

        for i in range(len(self.alternatives)):
            for p in self.attributes_cars:
                self.alternatives[i]["consideredAttributes"][p[0]]["value"] = self.format_value(self.alternatives[i]["consideredAttributes"][p[0]]["value"])
                if first:
                    self.costs.append(self.alternatives[i]["consideredAttributes"][p[0]]["cost"])
                
            if first:
                first = False

    def gen_alternatives_values_array(self):
        for b in self.results["considered"]:
            alternative = []
            for p in self.attributes_cars:
                alternative.append(b["consideredAttributes"][p[0]]["value"])

            self.alternatives_values.append(alternative)

    def filter_unsuitable_alternatives(self):
        for b in self.alternatives:
            qualified = True

            for i in range(0, len(self.requirements)):
                if self.requirements[i][0]: 
                    prop = b["consideredAttributes"][self.attributes_cars[i][0]]
                    if prop["cost"]:
                        if prop["value"] < self.requirements[i][1]:
                            qualified = False
                            break
                    else:
                        if prop["value"] > self.requirements[i][1]:
                            qualified = False
                            break
            
            if qualified:
                self.results["considered"].append(b)
            else:
                self.results["disqualified"].append(b)

    def print_light_results(self):
        if self.results["optimum_id"] is None:
            print("No result yet. Execute the solver before.")
        else:
            print("Considered alternatives: ")
            for a in self.results["considered"]:
                print("- %s" %(a["name"] + " (" + a["infoAttributes"]["consensusAlgorithm"] + ")"))

            print("Disqualified alternatives: ")
            for a in self.results["disqualified"]:
                print("- %s" %(a["name"] + " (" + a["infoAttributes"]["consensusAlgorithm"] + ")"))

            best_altr = self.results["considered"][self.results["optimum_id"]]
            print("Best solution: %s" %(best_altr["name"] + " (" + best_altr["infoAttributes"]["consensusAlgorithm"] + ")"))

    def get_costs(self):
        costs = []

        for p in self.attributes_cars:
            costs.append(p[1])
        
        return costs

    def solve(self):
        self.abst_attrs_values = self.get_abst_attrs_values()
        self.format_blockchains_alts()

        self.filter_unsuitable_alternatives()
        self.gen_alternatives_values_array()

        decision = topsis(self.alternatives_values, self.weights, self.get_costs())
        decision.calc()
        self.results['optimum_id'] = decision.optimum_choice

        self.print_light_results()


        
                
                
