const main = async () => {
  const gameContractFactory = await hre.ethers.getContractFactory('MyEpicGame');
  
  const gameContract = await gameContractFactory.deploy(                        
    ["Luigi", "Toad", "Mario", "Yoshi"],       // Names
      ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrYX5Tk4oRB9eKmK6UOGry6sAME0dIsD9jKQ&usqp=CAU", // Images
      "https://cdn.vox-cdn.com/thumbor/CVKQO8SiQ2oFJEg5ui1Yz62HTLw=/1400x1050/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/13109287/tum.jpg", 
      "https://c.wallhere.com/photos/6d/ad/Super_Mario_Mario_Bros_digital_art_Nintendo_video_games_white_background_simple_background-256535.jpg!d",
      "https://stringfixer.com/files/157088072.jpg"],
      [200, 100, 300, 200],                    // HP values
      [100, 2000, 200, 100],                       // Attack damage values
      "King Koopa", // Boss name
      "https://upload.wikimedia.org/wikipedia/en/9/92/Bowser_Stock_Art_2021.png", // Boss image
      10000, // Boss hp
      50 // Boss attack damage
  );

  await gameContract.deployed();
  console.log("Contract deployed to:", gameContract.address);

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