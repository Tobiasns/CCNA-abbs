from flask import Flask, render_template, request, g
import json

app = Flask(__name__)
app.debug = True


class Abbrevations():
    def __init__(self, abbrevations_file):
        self.__abbrevations = {}
        self.__load_abbrevations(abbrevations_file)
        #self.__load_abbrevations(abbrevations_file)

    def __load_abbrevations(self, abbrevations_file):
        """Loads a list of abbrevations from a file."""
        abbrevationsList = []
        with open(abbrevations_file, "r") as f:
            for line in f:
                id, abbrevation, fullName = line.strip().split("\t")
                theAbbrevation            = [id, abbrevation, fullName]
                abbrevationsList.append(theAbbrevation)
                self.__abbrevations[id] = abbrevation, fullName
    
    def get_abbrevations(self):
        """Returns a list of all abbrevations, with abbrevationID, abbrevation and fullName."""
        return self.__abbrevations

    def get_abbrevation(self, abbrevation_id):
        """Returns all details of an abbrevation."""
        return self.__abbrevations[abbrevation_id]


app.config["abbrevations"] = Abbrevations("src/static/data/abbrevations.txt")

@app.route("/")
def abbrevationGame():
    return render_template("gameActive.html")

@app.route("/getAbbrevation/<int:id>")
def getAbbrevation(id):
    abbrevations = app.config["abbrevations"]
    abbrevations_list = abbrevations.get_abbrevations()
    return json.dumps(abbrevations_list)



if __name__ == "__main__":
    app.run()