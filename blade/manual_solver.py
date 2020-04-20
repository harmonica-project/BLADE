#!/usr/bin/env python3
# Temporary script for the decision process using the CLI


import yaml
import argparse
from app.blade_lib import solve_from_dict
if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Decision process blockchain')
    parser.add_argument('user_inputs', metavar='FILE', type=str)

    args = parser.parse_args()

    with open(args.user_inputs, "r") as f:
        d = yaml.load(f,Loader=yaml.FullLoader)
        solve_from_dict(d)
