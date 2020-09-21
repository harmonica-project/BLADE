# coding: utf-8
import configparser


def get_parser():
    config = configparser.ConfigParser()
    config.read("./src/classes/settings.cfg")
    return config

def get_database():
    cfg = get_parser()
    try:
        database = cfg.get('MongoDB', 'database')
        return database
    except Exception as e:
        print("Error: ", e, "\nUsing default database name instead ...")
        return "knowledge-base"

def get_config_mongodb():
    cfg = get_parser()
    try:
        user = cfg.get('MongoDB', 'user')
        password = cfg.get('MongoDB', 'password')
        host = cfg.get('MongoDB', 'host')
        port = cfg.get('MongoDB', 'port')
        
        if host == "":
            host = "localhost"

        if port == "":
            port = "27017"

        if user == "" or password == "":
            return "mongodb://" + host + ":" + port + "/"
        else:
            return "mongodb://" + user + ":" + password + "@" + host + ":" + port + "/"
    except Exception as e:
        print("Error: ", e, "\nUsing default database login informations instead ...")
        return "mongodb://localhost:27017/"