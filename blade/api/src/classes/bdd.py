# coding: utf-8

from pymongo import MongoClient
from pymongo import errors
from . import settings
import pymongo as pym
import time
import pprint


class Bdd:
    def __init__(self):

        self.db, self.client = self.connect()

    def connect(self):
        client = MongoClient(settings.get_config_mongodb())
        db = client[settings.get_database()]
        return db, client

    def disconnect(self):
        self.client.close()

    def parse_abs_values_to_dict(self, abs_values):
        new_abs_values = {}
        for value in abs_values:
            new_abs_values[value["name"]] = value["value"]
        
        return new_abs_values
    
    def parse_attr_metadata_to_dict(self, attr_metadatas):
        new_attr_metadatas = {}
        for meta in attr_metadatas:
            new_attr_metadatas[meta["name"]] = {
                "defaultCost": meta["defaultCost"],
                "type": meta["type"]
            }
        
        return new_attr_metadatas

    def merge_alternative_and_metadata(self, alternatives, label_values, metadata):
        for i in range(len(alternatives)):
            for attrKey in alternatives[i]["consideredAttributes"]:
                if alternatives[i]["consideredAttributes"][attrKey]["value"] in label_values:
                    alternatives[i]["consideredAttributes"][attrKey]["value"] = label_values[alternatives[i]["consideredAttributes"][attrKey]["value"]]
                alternatives[i]["consideredAttributes"][attrKey]["cost"] = metadata[attrKey]["defaultCost"]
                alternatives[i]["consideredAttributes"][attrKey]["type"] = metadata[attrKey]["type"]
        return alternatives

    def get_alternatives(self):
        abst_labels_values = self.parse_abs_values_to_dict(self.get_abst_labels_values())
        attr_meta = self.parse_attr_metadata_to_dict(self.get_attributes_metadata())

        # The function automatically replaces label values (eg. advanced) with numbers defined in database
        alternatives = self.merge_alternative_and_metadata(list(self.db.blockchains.find()), abst_labels_values, attr_meta)
        pprint.pprint(alternatives)
        return alternatives

    def get_abst_labels_values(self):
        abst_labels_values = list(self.db.abstract_labels_values.find())
        return abst_labels_values

    def get_attributes_metadata(self):
        attr_meta = self.db.attributes_metadata.find_one()
        return list(attr_meta["content"])

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