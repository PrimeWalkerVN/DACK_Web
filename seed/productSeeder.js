// Create an instance of model Product
let Product = require('../models/product');
let mongoose = require('mongoose');
let baseUrl = "mongodb://localhost:27017/test"
let mongoDB = baseUrl;

mongoose.connect(mongoDB, { useNewUrlParser: true });

let aokhoac = [
    new Product.SP_aokhoac ({
        id: 1,
        title: 'Áo khoác nam cách nhiệt GOKING (Màu đen)',
        price: 193000,
        typeProduct: "Áo khoác",
        brand: "Gucci",
        color: "Đen",
        imagePath: "/img/product/ao-khoac/ao-khoac-nam-1.jpg"
    }),
   
    new Product.SP_aokhoac ({
        id: 2,
        title: 'Áo Khoác Kaki Nam Hai Lớp Simple Cao Cấp ShopN6-KK35',
        price: 198000,
        typeProduct: "Áo khoác",
        brand: "Pull&Bear",
        color: "Vàng gold",
        imagePath: "/img/product/ao-khoac/ao-khoac-nam-2.jpg"
    }),
   
    new Product.SP_aokhoac ({
        id: 3,
        title: 'Áo Khoác Free Fire Hoodie Có Mũ Dài Tay',
        price: 199000,
        typeProduct: "Áo khoác",
        brand: "H&M",
        color: "Trắng",
        imagePath: "/img/product/ao-khoac/ao-khoac-nam-3.jpg"
    }),
   
    new Product.SP_aokhoac ({
        id: 4,
        title: "Hoodie PlayerUnknown's Battlegrounds",
        price: 159000,
        typeProduct: "Áo khoác",
        brand: "Mango",
        color: "Đen",
        imagePath: "/img/product/ao-khoac/ao-khoac-nam-4.jpg"
    })
   
];  

for(let i = 0; i < aokhoac.length; i++){
    // Save the new model instance, passing a callback
    aokhoac[i].save(function (err,result) {
        done++;
        if(done===aokhoac.length)
          exit();
     });
}
done = 0;

let quantay = [
    new Product.SP_quantay ({
        id: 1,
        title: 'Quần Tây Nam Vải Tuyết Mưa',
        price: 135000,
        typeProduct: "Quần tây",
        brand: "Routine",
        color: "Đen",
        imagePath: "/img/product/quan/quan-tay-1.jpg"
    }),
    new Product.SP_quantay ({
        id: 2,
        title: 'Quần Tây Âu Nam Titishop QTN64 - Đen',
        price: 95000,
        typeProduct: "Quần tây",
        brand: "Gucci",
        color: "Đen",
        imagePath: "/img/product/quan/quan-tay-2.jpg"
    }),
    new Product.SP_quantay ({
        id: 3,
        title: 'Quần tây nam ống suông công sở',
        price: 165000,
        typeProduct: "Quần tây",
        brand: "Pull&Bear",
        color: "Xanh da trời",
        imagePath: "/img/product/quan/quan-tay-3.jpg"
    }),
    new Product.SP_quantay ({
        id: 4,
        title: 'Quần Tây Âu Màu Trơn Cho Nam',
        price: 135000,
        typeProduct: "Quần tây",
        brand: "Mango",
        color: "Đen",
        imagePath: "/img/product/quan/quan-tay-4.jpg"
    })
    
];  

for(let i = 0; i < quantay.length; i++){
    // Save the new model instance, passing a callback
    quantay[i].save(function (err,result) {
        done++;
        if(done===quantay.length)
          exit();
     });
}
done = 0;

let quanthethao = [
    new Product.SP_quanthethao ({
        id: 1,
        title: 'Quần thể thao nữ tập gym yoga lưng cao',
        price: 139000,
        typeProduct: "Quần thể thao",
        brand: "Mango",
        color: "Đen",
        imagePath: "/img/product/quan/quan-the-thao-1.jpg"
    }),
    new Product.SP_quanthethao ({
        id: 2,
        title: 'Quần short thể thao nam Gymlink G505',
        price: 89000,
        typeProduct: "Quần thể thao",
        brand: "H&M",
        color: "Đen",
        imagePath: "/img/product/quan/quan-the-thao-2.jpg"
    }),
    new Product.SP_quanthethao ({
        id: 3,
        title: 'Quần Short thể thao nữ 2 lớp viền màu',
        price: 69000,
        typeProduct: "Quần thể thao",
        brand: "Gucci",
        color: "Hồng mạnh mẽ",
        imagePath: "/img/product/quan/quan-the-thao-3.jpg"
    }),
    new Product.SP_quanthethao ({
        id: 4,
        title: 'Quần short thể thao nữ Now Day QN99 Sportslink',
        price: 98000,
        typeProduct: "Quần thể thao",
        brand: "Trắng",
        color: "Đen",
        imagePath: "/img/product/quan/quan-the-thao-4.jpg"
    })
    
];  

for(let i = 0; i < quanthethao.length; i++){
    // Save the new model instance, passing a callback
    quanthethao[i].save(function (err,result) {
        done++;
        if(done===quanthethao.length)
          exit();
     });
}
done = 0;

let quanjogger = [
    new Product.SP_quanjogger ({
        id: 1,
        title: 'Quần jogger kaki túi hộp JG5',
        price: 117000,
        typeProduct: "Quần jogger",
        brand: "Gucci",
        color: "Đen",
        imagePath: "/img/product/quan/quan-jogger-1.jpg"
    }),
    new Product.SP_quanjogger ({
        id: 2,
        title: 'Quần Jogger Kaki Nam Dáng Thể Thao Chất Lượng Cao',
        price: 82000,
        typeProduct: "Quần jogger",
        brand: "H&M",
        color: "Đen",
        imagePath: "/img/product/quan/quan-jogger-2.jpg"
    }),
    new Product.SP_quanjogger ({
        id: 3,
        title: 'Quần jogger kaki nam túi hộp New arrival 04',
        price: 105000,
        typeProduct: "Quần jogger",
        brand: "Mango",
        color: "Đen",
        imagePath: "/img/product/quan/quan-jogger-3.jpg"
    }),
    new Product.SP_quanjogger ({
        id: 4,
        title: 'Quần Jogger Nam Nữ Chất Nỉ Cao Cấp',
        price: 59000,
        typeProduct: "Quần jogger",
        brand: "Gucci",
        color: "Trắng",
        imagePath: "/img/product/quan/quan-jogger-4.jpg"
    })
];  

for(let i = 0; i < quanjogger.length; i++){
    // Save the new model instance, passing a callback
    quanjogger[i].save(function (err,result) {
        done++;
        if(done===quanjogger.length)
          exit();
     });
}
done = 0;


let vay = [
    new Product.SP_vay ({
        id: 1,
        title: 'Chân Váy Tennis',
        price: 59000,
        typeProduct: "Váy",
        brand: "Gucci",
        color: "Đen",
        imagePath: "/img/product/quan/vay-1.jpg"
    }),
    
    new Product.SP_vay ({
        id: 2,
        title: 'Chân váy xòe 2 túi sành điệu - màu đen',
        price: 69000,
        typeProduct: "Váy",
        brand: "Mango",
        color: "Đen",
        imagePath: "/img/product/quan/vay-2.jpg"
    }),
    
    new Product.SP_vay ({
        id: 3,
        title: 'Chân váy jeans chữ A',
        price: 91000,
        typeProduct: "Váy",
        brand: "Routine",
        color: "Đen",
        imagePath: "/img/product/quan/vay-3.jpg"
    }),

    new Product.SP_vay ({
        id: 4,
        title: 'Chân Váy Xòe Ren Chân - Đen',
        price: 54000,
        typeProduct: "Váy",
        brand: "Gucci",
        color: "Đen",
        imagePath: "/img/product/quan/vay-4.jpg"
    }),

];  

for(let i = 0; i < vay.length; i++){
    // Save the new model instance, passing a callback
    vay[i].save(function (err,result) {
        done++;
        if(done===vay.length)
          exit();
     });
}
done = 0;

let dam = [
    new Product.SP_dam ({
        id: 1,
        title: 'Đầm Hoa Xinh Dễ Thương Thời Trang Kiểu Hàn Quốc DN015 MayHomes',
        price: 149000,
        typeProduct: "Đầm",
        brand: "Gucci",
        color: "Đen",
        imagePath: "/img/product/quan/dam-1.jpg"
    }),
    
    new Product.SP_dam ({
        id: 2,
        title: 'Đầm hồng form ngắn thắt eo',
        price: 139000,
        typeProduct: "Đầm",
        brand: "Gucci",
        color: "Hồng mạnh mẽ",
        imagePath: "/img/product/quan/dam-2.jpg"
    }),
    
    new Product.SP_dam ({
        id: 3,
        title: 'Đầm mila xanh form dài thắt eo',
        price: 119000,
        typeProduct: "Đầm",
        brand: "Mango",
        color: "Xanh da trời",
        imagePath: "/img/product/quan/dam-3.jpg"
    }),
   
    new Product.SP_dam ({
        id: 4,
        title: 'Đầm Tay Xếp Ly Kiểu Gumac MS09958',
        price: 220000,
        typeProduct: "Đầm",
        brand: "Gucci",
        color: "Xanh da trời",
        imagePath: "/img/product/quan/dam-4.jpg"
    }),
    
];  

for(let i = 0; i < dam.length; i++){
    // Save the new model instance, passing a callback
    dam[i].save(function (err,result) {
        done++;
        if(done===dam.length)
          exit();
     });
}
done = 0;



function exit()
{
    mongoose.disconnect(); // saved!
}

