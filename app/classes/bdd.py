# coding: utf-8

from pymongo import MongoClient
from pymongo import errors
from . import settings
import pymongo as pym
import time


class Bdd:
    def __init__(self):

        self.db, self.client = self.connect()

    def connect(self):
        client = MongoClient(settings.get_config_mongodb())
        db = client[settings.get_database()]
        return db, client


    def disconnect(self):
        self.client.close()

    def get_alternatives(self):
        alternatives = list(self.db.blockchains.find())
        return alternatives

    def get_abst_labels_values(self):
        abst_labels_values = list(self.db.abstract_labels_values.find())
        return abst_labels_values

    def get_attr_names(self):
        attr_names = self.db.attr_names.find_one()
        return list(attr_names["content"])

    def save_results(self, alternatives, requirements, weights, costs, results):
        self.db.historical_results.insert_one({
            "alternatives": alternatives,
            "requirements": requirements,
            "weights": weights,
            "costs": costs,
            "considered": results["considered"],
            "disqualified": results["disqualified"],
            "optimum_id": results["optimum_id"].item()
        })