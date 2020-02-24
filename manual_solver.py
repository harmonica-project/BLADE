# Temporary script for the decision process using the CLI 

from app.classes.solver import Solver

if __name__ == '__main__':
    #Weights and requirements must have same length from each other and from alternatives attributes list
    weights = [0, 0, 0, 0, 0.25, 0.75, 0.5, 0, 0, 0, 0, 0, 0, 0.5]

    #Requirements is constituted with tuples containing an integer that indicates if an attribute is required and if yes, 
    #the value linked to that requirement if needed
    requirements = [(0,), (0,), (0,), (0,), (1, 200), (0,), (0,), (0,), (0,), (0,), (0,), (0,), (0,), (0,)]

    s = Solver(weights, requirements)
    s.solve()
    s.save_results()
