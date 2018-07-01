from bs4 import BeautifulSoup
import json
import requests
from collections import defaultdict

url = "https://sfelections.org/results/20180605/data/20180627/mayor/20180627_mayor.html"

r  = requests.get(url)
sankey = {'nodes': [], 'links': []}
nodes = sankey['nodes']
links = sankey['links']

data = r.text
soup = BeautifulSoup(data, "html.parser")
#print soup
trs = soup.find(id = "ResultsContainer").findAll("table")[0].findAll("tr")[2:10]
trs.append(soup.find(id = "ResultsContainer").findAll("table")[0].findAll("tr")[14])


indexToCandidateRound = defaultdict(str)
eliminatedToRound = []
roundToEliminated = defaultdict(str)
transferList = []
linkNames = []
for tr in trs:
	print tr
	tds = tr.findAll('td')
	candidateName = tds[0].text.title()
	rounds = tr.findAll("td")[7:27:3]
	transfers = tr.findAll("td")[9:29:3]
	#print transfers

	'''if not tr.findAll("td", {"class": "VotesCell"}):
		rounds =  tr.findAll("td", {"class": "LeaderVotesCell"})[2:]
	else:
		rounds = tr.findAll("td", {"class": "VotesCell"})[2:]'''
	#print candidateName + " : " + str(rounds)
	for i in range(len(rounds)):
		if rounds[i].text != "0":
			nodes.append({'name': candidateName + " round" + str(i+1), 'candidate': candidateName, 'round': i+1, 'votes': int(rounds[i].text)})
			#links.append({'source': i, 'target': candidateName})
			indexToCandidateRound[candidateName + " round" + str(i+1)] = len(nodes)-1
	for i in range(len(transfers)):
		if transfers[i].text[0] == "-":
			eliminatedToRound.append(candidateName + " round" + str(i+1))
			roundToEliminated["round" + str(i+1)] = candidateName + " round" + str(i+1)
		elif transfers[i].text[0] == "+":
			
			transferList.append({"source": "", "target": candidateName + " round" + str(i+2), "votes": int(transfers[i].text[1:])})



for i in range(len(nodes)):
	name = nodes[i]['name']
	candidate = nodes[i]['candidate']
	round = nodes[i]['round']
	nextround = round+1
	votes = nodes[i]['votes']
	if name not in eliminatedToRound:
		if indexToCandidateRound[candidate + " round" + str(nextround)] != "":
			linkNames.append({"source":name, "target": candidate + " round" + str(nextround), "value": votes})
			links.append({"source": indexToCandidateRound[name], "target": indexToCandidateRound[candidate + " round" + str(nextround)], "value": votes})
		else:
			pass
	else:
		pass

for i in range(len(transferList)):
	target = transferList[i]['target']
	#print int(target.split(" ")[-1][-1]) - 1
	targetRound = "round" + str(int(target.split(" ")[-1][-1]) - 1)
	votes = transferList[i]["votes"]
	source = indexToCandidateRound[roundToEliminated[targetRound]]
	#print target
	#print targetRound
	#print roundToEliminated[targetRound]
	#print indexToCandidateRound[roundToEliminated[targetRound]]
	linkNames.append({"source": roundToEliminated[targetRound], "target": target, "value": votes})
	links.append({"source": source, "target": indexToCandidateRound[target], "value": votes})
#print len(links)
print linkNames
#print links

for k,v in indexToCandidateRound.iteritems():
	#print k,v
	pass

sankey['nodes'] = nodes
sankey['links'] = links


with open('public/data/sankey.json', 'w') as outfile:
    json.dump(sankey, outfile)
    #pass

