# Temporary script for the decision process using the CLI 

from app.classes.solver import Solver
import yaml
import argparse

if __name__ == '__main__':
    # Weights and requirements must have same length from each other and from alternatives attributes list
    # weights = [0, 0, 0, 0, 0.25, 0.75, 0.5, 0, 0, 0, 0, 0, 0, 0.5]

    parser = argparse.ArgumentParser(description='Decision process blockchain')
    parser.add_argument('user_inputs', metavar='FILE', type=str)


    args = parser.parse_args()



    with open(args.user_inputs, "r") as f:
        d = yaml.load(f,Loader=yaml.FullLoader)

        weights = [v["weight"] for k, v in d.items()]

        # Requirements is constituted with tuples containing an integer that indicates if an attribute is required and if yes,
        # the value linked to that requirement if needed
        # requirements = [(0,), (0,), (0,), (0,), (1, 200), (0,), (0,), (0,), (0,), (0,), (0,), (0,), (0,), (0,)]
        requirements = [(0,) if len(v["requirements"]) == 0 else (
        1 if v["requirements"]["key"] == "mandatory" else -1, v["requirements"]["value"]) for k, v in d.items()]

        s = Solver(weights, requirements)
        s.solve()
        s.save_results()
