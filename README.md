# NFT-group8-UI

# How to run
## a.	Xây dựng và deploy contract (NFT-Contract-group8)  
cd NFT-Contract-group8  
npx hardhat run scripts/deploy.js --network rinkeby  

Sau đó khi deploy thành công chúng ta sẽ nhận được địa chỉ của deploy (mỗi lần deploy sẽ có địa chỉ khác nhau)  
Lưu lại địa chỉ này.  
Sau đó và đường dẫn artifacts/contracts/MyEpicGame.sol/MyEpicGame.json, và copy toàn bộ nội dung file.  

## b.	Hiển thị UI của NFT (NFT-UI-group8)

Chúng ta sẽ sử dụng replit để có thể chạy UI của đồ án này  
Link https://replit.com/@Nhat-KhanKhan/Project-NFT-group8 

Chúng ta và phần src/constants.js và thay đổi CONTRACT_ADDRESS thành địa chỉ chúng ta nhận được  
Vào đường dẫn src/utils/MyEpicGame.json và paste toàn nội dung file ABI đã copy ở trên vào đây  
Sau đó run đồ án  

