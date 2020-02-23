# Temporary script for the decision process using the CLI 

from app.classes.solver import Solver

if __name__ == '__main__':
    weights = [0, 0, 0, 0, 0.25, 0.75, 0.5, 0, 0, 0, 0, 0, 0, 0.5]
    requirements = [(0,), (0,), (0,), (0,), (1, 200), (0,), (0,), (0,), (0,), (0,), (0,), (0,), (0,), (0,)]

    s = Solver(weights, requirements)
    s.solve()
