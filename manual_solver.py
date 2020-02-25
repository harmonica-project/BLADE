# Temporary script for the decision process using the CLI 

from app.classes.solver import Solver
import yaml
import argparse

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Decision process blockchain')
    parser.add_argument('user_inputs', metavar='FILE', type=str)

    args = parser.parse_args()

    with open(args.user_inputs, "r") as f:
        d = yaml.load(f,Loader=yaml.FullLoader)
        weights = [v["weight"] for k, v in d.items()]
        requirements = [(0,) if len(v["requirements"]) == 0 else (
        1 if v["requirements"]["key"] == "mandatory" else -1, v["requirements"]["value"]) for k, v in d.items()]

        s = Solver(weights, requirements)
        s.solve()
        s.save_results()
