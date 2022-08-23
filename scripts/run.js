const main = async () => {
    const gameContractFactory = await hre.ethers.getContractFactory('MyEpicGame');
    const gameContract = await gameContractFactory.deploy(
      ["Luigi", "Toad", "Mario", "Yoshi"],       // Names
      ["https://mario.wiki.gallery/images/thumb/f/f5/Luigi_Artwork_-_Super_Mario_64_DS.png/1200px-Luigi_Artwork_-_Super_Mario_64_DS.png", // Images
      "https://mario.wiki.gallery/images/thumb/8/89/MPS_Toad_Artwork.png/170px-MPS_Toad_Artwork.png", 
      "https://upload.wikimedia.org/wikipedia/vi/a/a9/MarioNSMBUDeluxe.png",
      "https://upload.wikimedia.org/wikipedia/vi/d/db/Yoshi_%28Nintendo_character%29.png"],
      [200, 100, 300, 200],                    // HP values
      [100, 2000, 200, 100],                       // Attack damage values
      "King Koopa", // Boss name
      "https://upload.wikimedia.org/wikipedia/en/9/92/Bowser_Stock_Art_2021.png", // Boss image
      10000, // Boss hp
      50 // Boss attack damage
    );
    await gameContract.deployed();
    console.log("Contract deployed to:", gameContract.address);

    let txn;
    txn = await gameContract.mintCharacterNFT(2);
    await txn.wait();

    txn = await gameContract.attackBoss();
    await txn.wait();

    txn = await gameContract.attackBoss();
    await txn.wait();
};
  
const runMain = async () => {
    try {
      await main();
      process.exit(0);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
};
  
runMain();

