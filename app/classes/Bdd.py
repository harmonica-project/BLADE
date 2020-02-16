# coding: utf-8

from pymongo import MongoClient
from pymongo import errors
import settings
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