# coding: utf-8

from . import bdd
import numpy as np
import pprint
from constraint import *
from src.classes.bdd import Bdd


class ConstraintSolver:
    """ConstraintSolver object is responsible of doing calculations to find the conflicts between requirements and help finding solutions during requirements selection."""

    def __init__(self):
        """Initialize the object by creating a new solving session"""
        self.bdd = Bdd()
        self.alternatives = self.bdd.get_alternatives()
        self.problem = Problem()
        print(self.problem.getSolver())

    def __del__(self):
        """Disconnects from bdd and destroy the bdd object when called"""

        self.bdd.disconnect()
        del self.bdd

    def removeduplicate(self, it):
        seen = set()
        for x in it:
            t = tuple(x.items())
            if t not in seen:
                yield x
                seen.add(t)

    def set_solutions(self):
        """Defines the solutions from the alternatives"""
        attribute_value_pair = []
        for a in self.alternatives:
            for key, value in a["consideredAttributes"].items():
                attribute_value_pair.append({"key":key, "value":value["value"]})

        # Removing duplicates pair of requirements
        attribute_value_pair = list(self.removeduplicate(attribute_value_pair))
        self.problem.addVariable("r1", attribute_value_pair)
        self.problem.addVariable("r2", attribute_value_pair)

    def compute_constraints(self, parse=True):
        def noAlternative(r1, r2):
            for a in self.alternatives:
                if (a["consideredAttributes"][r1["key"]]["value"] == r1["value"]) and (a["consideredAttributes"][r2["key"]]["value"] == r2["value"]):
                    return False
            return True

        constraints = []

        self.problem.addConstraint(lambda r1, r2: r1["key"] != r2["key"], ("r1", "r2"))
        self.problem.addConstraint(FunctionConstraint(noAlternative), ("r1", "r2"))
        solutions = self.problem.getSolutions()

        for solution in solutions:
            # Eliminates inversed pairs of requirements
            if sorted([solution["r1"]["key"],solution["r2"]["key"]])[0] is solution["r1"]["key"]:
                constraint = {
                    solution["r1"]["key"]: solution["r1"]["value"],
                    solution["r2"]["key"]: solution["r2"]["value"]
                }
            else:
                constraint = {
                    solution["r2"]["key"]: solution["r2"]["value"],
                    solution["r1"]["key"]: solution["r1"]["value"]
                }

            if constraint not in constraints:
                constraints.append(constraint)

        if parse:
            return self.parse_constraints(constraints)
        else:
            return constraints

    def parse_constraints(self, constraints):
        parsed_constraints = {}
        for constraint in constraints:
            rpairs = list(constraint.keys())

            for i in range(2):
                j = 1
                if i:
                    j = 0

                r = rpairs[i]
                if r not in parsed_constraints:
                    parsed_constraints[r] = {}

                if constraint[r] not in parsed_constraints[r]:
                    parsed_constraints[r][constraint[r]] = [{rpairs[j]: constraint[rpairs[j]]}]
                else:
                    parsed_constraints[r][constraint[r]].append({rpairs[j]: constraint[rpairs[j]]})

        return parsed_constraints