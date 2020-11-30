// Importing the MovieRating Smart Contract ABI (JSON representation of the Smart Contract)
const MovieRating = artifacts.require("MovieRating");
var accounts; // List of development accounts provided by Truffle
var owner; // Global variable use it in the tests cases

const ERRORS = 
    {
        "RATE_LIMIT_ERROR":"Rating should be between 1 to 5",
        "MOVIE_NOT_EXIST":"Movie Doesn't exist",
        "OWNER_CAN_ADD_ONLY":"Only owner can add a movie"
    }
// This called the MovieRating Smart contract and initialize it
contract('MovieRating', (accs) => {
    accounts = accs; // Assigning test accounts
    owner = accounts[0]; // Assigning the owner test account
});
// initialized in the contract constructor
it('Should have movies when deployed', async () => {
    let instance = await MovieRating.deployed(); // Making sure the Smart Contract is deployed and getting the instance.
    let movies = await instance.getMovies(); 
    assert.notEqual(movies.length, 0); 
});
it("Should Add Movie ", async () => {
    let instance = await MovieRating.deployed();
    let oldMovies = await instance.getMovies(); 
    let response = await instance.add("Singham");
    let newMovies = await instance.getMovies(); 

    assert.equal(newMovies.length, oldMovies.length+1); 
});

it("Should rate the movie", async () => {
    let instance = await MovieRating.deployed();
    let { receipt:{status}} = await instance.rate(0, 2);

    assert.equal(status, true);
})

it("Should not be able rate the movie above 5", async () => {
    let instance = await MovieRating.deployed();

    try{
        await instance.rate(0, 6);
    }catch(error){
        const {reason} = error;
        assert.equal(reason, ERRORS["RATE_LIMIT_ERROR"])
    }

})


it("Should not be able rate the movie 0", async () => {
    let instance = await MovieRating.deployed();

    try{
        await instance.rate(0, 0);
    }catch(error){
        const {reason} = error;
        assert.equal(reason, ERRORS["RATE_LIMIT_ERROR"])
    }

})

it("Should not be able rate the movie if id doesn't exist", async () => {
    let instance = await MovieRating.deployed();
    try{
        await instance.rate(100, 1);
    }catch(error){
        const {reason} = error;
        assert.equal(reason, ERRORS["MOVIE_NOT_EXIST"])
    }

})

it("Only Owner should be able to add movie", async () => {
    let instance = await MovieRating.deployed();
    try{
        await instance.add("I Am Legend", {from: accounts[1]});
    }catch(error){
        const {reason} = error;
        assert.equal(reason, ERRORS["OWNER_CAN_ADD_ONLY"])
    }
});


