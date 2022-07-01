// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ["A", "T", "C", "G"];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

// Create a pAequor specimen
const pAequorFactory = (specimenNum, dna) => {
  let newSimulation = {
    specimenNum,
    dna,
    mutate() { // Changes one random piece of the DNA array to another base
      const randomIndex = Math.floor(Math.random() * this.dna.length);
      let newBase = returnRandBase();
      while (this.dna[randomIndex] === newBase) {
        newBase = returnRandBase();
      }
      this.dna[randomIndex] = newBase;
      return this.dna;
    },
    compareDNA(compareSpecimen) { // Compare the percentage difference between current and requested specimen.
      let difference = 0;
      for (i = 0; i < compareSpecimen.dna.length; i++) {
        if (compareSpecimen.dna[i] === this.dna[i]) {
          difference++;
        }
      }
      return `specimen #1 and specimen #2 have ${(
        (difference / compareSpecimen.dna.length) *
        100
      ).toFixed(2)}% DNA in common`;
    },
    willLikelySurvive() { // Checks percentage of C and G DNA to determine survival chance
      const percentRequirement = 60;
      let cCount = 0;
      let gCount = 0;

      for (var i = 0; i < this.dna.length; ++i) {
        if (this.dna[i] === "C") {
          cCount++;
        } else if (this.dna[i] === "G") {
          gCount++;
        }
      }

      let cPercentage = (cCount / this.dna.length) * 100;
      let gPercentage = (gCount / this.dna.length) * 100;

      if (
        cPercentage >= percentRequirement ||
        gPercentage >= percentRequirement
      ) {
        return true;
      } else {
        return false;
      }
    },
  };
  return newSimulation;
};

const pAequorBest = [];
let pAequorId = 1

while (pAequorBest.length < 30) { // Create 30 specimens with high % of survival
  const specimen = pAequorFactory(pAequorId, mockUpStrand());
  if (specimen.willLikelySurvive()) {
    pAequorBest.push(specimen);
  }
  pAequorId++
}

console.log(pAequorBest) 