f = open("training-tracker.csv", "r")
rawText = f.read()
f.close()

textArray = rawText.split("\n")[5:]

class smMember:
    def __init__(self, name, rank, team, ribbons, notes):
        self.name = name
        self.rank = rank
        self.team = team
        self.ribbons = ribbons
        self.notes = notes

ribbonCategories = ["BIT", "AIT", "", "G", "AR", "LAT", "M", "HAT", "MG", "", "CMT", "EXPL", "FC", "", "JTAC", "CMO", "FO", "", "TL", "", "PL"]

ribbonLevels = {
    "BIT" : 0,
    "AIT" : 0,
    "G" : 1,
    "AR" : 1,
    "LAT" : 1,
    "M" : 1,
    "HAT" : 1,
    "MG" : 1,
    "CMT" : 2,
    "EXPL" : 2,
    "FC" : 2,
    "JTAC" : 3,
    "CMO" : 3,
    "FO" : 3,
    "TL" : 4,
    "PL" : 5
}

rankLevels = ["Pvt", "Pfc", "LCpl", "Cpl", "Sgt", "SSgt"]

currentTeam = ""

members = []

for i in range(len(textArray)):
    row = textArray[i]
    currentName = ""
    currentRank = ""
    currentRibbons = []
    currentNotes = ""
    if row[0] == ",":
        currentTeam = row[1 : row[1:].index(",") + 1]
    else:
        currentName = row[0 : row.index(",")]
        lastDoubleCommaIndex = len(row) - 2 - row[::-1].index(",,")
        lastCommaIndex = len(row[0:lastDoubleCommaIndex]) - 1 - row[lastDoubleCommaIndex - 1 : 0 : -1].index(",")
        currentNotes = row[lastCommaIndex + 1 : lastDoubleCommaIndex]
        if currentTeam == "Recruits":
            currentRank = "Rct"
        else:
            ribbonInfo = row[row.index(",") + 1 : len(row) - 1 - row[::-1].index(",,,,")]
            positionInRow = 0
            for ribbonIndex in range(len(ribbonCategories)):
                if ribbonInfo[positionInRow] == "C":
                    positionInRow += 2
                    currentRibbons.append(ribbonCategories[ribbonIndex])
                elif ribbonInfo[positionInRow] == ",":
                    positionInRow += 1
                else:
                    positionInRow += 2
            if currentName == "BJS":
                currentRank = "1Lt"
            else:
                currentRank = rankLevels[ribbonLevels[currentRibbons[-1]]]
        thisMember = smMember(currentName, currentRank, currentTeam, currentRibbons, currentNotes)
        members.append(thisMember)

names = []
ranks = []
teams = []
ribbons = []
notes = []

for m in members:
    names.append(m.name)
    ranks.append(m.rank)
    teams.append(m.team)
    ribbons.append(m.ribbons)
    notes.append(m.notes)

print('''
var names = {0};
var ranks = {1};
var teams = {2};
var ribbons = {3};
var notes = {4};'''.format(names, ranks, teams, ribbons, notes)
)
