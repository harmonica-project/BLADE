import yaml

from app.classes.solver import Solver
from app.classes.bdd import Bdd

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
        if a + "Preference" in a_dict:
            sub_attr["weight"] = float(a_dict[a + "Preference"])
        if a + "RequiredCheck" in a_dict:
            sub_attr["requirements"] = {}
            sub_attr["requirements"]["key"] = "mandatory"
            sub_attr["requirements"]["value"] = float(a_dict[a])
        else:
            sub_attr["requirements"] = []
        res[a] = sub_attr
    return res


def solve_from_dict(d):
    weights = [v["weight"] for k, v in d.items()]
    requirements = [(0,) if len(v["requirements"]) == 0 else (
        1 if v["requirements"]["key"] == "mandatory" else -1, v["requirements"]["value"]) for k, v in d.items()]
    s = Solver(weights, requirements)
    p=s.solve()
    return p

def get_alternatives():
        bdd = Bdd()
        alternatives = bdd.get_alternatives()
        bdd.disconnect()
        del bdd
        return alternatives
