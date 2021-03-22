import yaml

from src.classes.solver import Solver
from src.classes.bdd import Bdd
from pprint import pprint

attributes = ["public",
              "permissionned",
              "nativeDataEncryption",
              "throughput",
              "latency",
              "energySaving",
              "byzantineProof",
              "smartContract",
              "cryptocurrency",
              "storageElt",
              "computationalElt",
              "assetMgElt",
              "softwareConnectorElt",
              "learningCurve"]


def get_request_from_dict(a_dict):
    res = {}
    for a in attributes:
        sub_attr = {}
        sub_attr["requirements"] = {}

        # Can happens if the user does not want to set a specific throughput, latency or byzantine proof 
        if a_dict[a] == "":
            sub_attr["requirements"]["value"] = 0
        else:
            sub_attr["requirements"]["value"] = float(a_dict[a])
        sub_attr["weight"] = float(a_dict[a + "Preference"])
            
        if a + "RequiredCheck" in a_dict:
            sub_attr["requirements"]["key"] = "mandatory"
        else:
            sub_attr["requirements"]["key"] = "preference"
        res[a] = sub_attr
    return res

def parse_requirements(d):
    weights = [float(v["weight"]) for k, v in d.items()]
    requirements = [(0,) if len(v["requirements"]) == 0 else (
        1 if v["requirements"]["key"] == "mandatory" else 0, float(v["requirements"]["value"])) for k, v in d.items()]
    return weights, requirements

def solve_from_dict_cli(d):
    weights, requirements = parse_requirements(d)
    p = Solver(weights, requirements).solve(True)
    return p

def solve_from_dict_api(d):
    weights, requirements = parse_requirements(d)
    p = Solver(weights, requirements).solve()
    return p


def get_alternatives():
        bdd = Bdd()
        alternatives = bdd.get_alternatives()
        bdd.disconnect()
        del bdd
        return alternatives
