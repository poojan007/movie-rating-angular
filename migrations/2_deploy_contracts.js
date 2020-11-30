var MovieRating = artifacts.require("MovieRating");

module.exports = function(deployer) {
  deployer.deploy(MovieRating, ["Over the Moon"]);
};
