// Create an instance of model Product
let Product = require('../models/product');

let mongoose = require('mongoose');
let baseUrl = "mongodb://localhost:27017/shopping"
let mongoDB = baseUrl;
let done = 0;

mongoose.connect(mongoDB, { useNewUrlParser: true });

//=====================Ao=============================
let aoLen = [
    new Product.SP_aoLen ({
        id: 1,
        title: 'Áo len thêu hoa',
        price: 150000,
        typeProduct: 'Áo len',
        brand: "Gucci",
        color: "Trắng",
        imagePath: '/img/product/ao/ao_len/aolen1'
    }),

    new Product.SP_aoLen ({
        id: 2,
        title: 'Áo len trắng',
        price: 159000,
        typeProduct: 'Áo len',
        brand: "Gucci",
        color: "Trắng",
        imagePath: '/img/product/ao/ao_len/aolen2'
    }),

    new Product.SP_aoLen ({
        id: 3,
        title: 'Áo len đỏ',
        price: 219000,
        typeProduct: 'Áo len',
        brand: "Routine",
        color: "Hồng mạnh mẽ",
        imagePath: '/img/product/ao/ao_len/aolen3'
    }),
   
    new Product.SP_aoLen ({
        id: 4,
        title: 'Áo len dài tay',
        price: 319000,
        typeProduct: 'Áo len',
        brand: "H&M",
        color: "Vàng gold",
        imagePath: '/img/product/ao/ao_len/aolen4'
    }),
];  


for(let i = 0; i < aoLen.length; i++){
    // Save the new model instance, passing a callback
    aoLen[i].save(function (err,result) {
        done++;
        if(done===aoLen.length)
          exit();
     });
}
done = 0;


let aoThun = [
    new Product.SP_aoThun ({
        id: 1,
        title: 'Áo thun Raglan',
        price: 150000,
        typeProduct: 'Áo thun',
        brand: "Mango",
        color: "Trắng",
        imagePath: '/img/product/ao/ao_thun/aothun1'
    }),

    new Product.SP_aoThun ({
        id: 2,
        title: 'Áo thun polo trắng',
        price: 159000,
        brand: "Pull&Bear",
        color: "Trắng",
        typeProduct: 'Áo thun',
        imagePath: '/img/product/ao/ao_thun/aothun2'
    }),

    new Product.SP_aoThun ({
        id: 3,
        title: 'Áo thun xanh trơn',
        price: 219000,
        typeProduct: 'Áo thun',
        brand: "Mango",
        color: "Xanh da trời",
        imagePath: '/img/product/ao/ao_thun/aothun3'
    }),
   
    new Product.SP_aoThun ({
        id: 4,
        title: 'Áo thun vàng trơn',
        price: 319000,
        typeProduct: 'Áo thun',
        brand: "Gucci",
        color: "Trắng",
        imagePath: '/img/product/ao/ao_thun/aothun4'
    }),
];  


for(let i = 0; i < aoThun.length; i++){
    // Save the new model instance, passing a callback
    aoThun[i].save(function (err,result) {
        done++;
        if(done===aoThun.length)
          exit();
     });
}
done = 0;


let aoLot = [
    new Product.SP_aoLot ({
        id: 1,
        title: 'Áo lót trắng',
        price: 150000,
        typeProduct: 'Áo lót',
        brand: "Gucci",
        color: "Trắng",
        imagePath: '/img/product/ao/ao_lot/aolot1'
    }),

    new Product.SP_aoLot ({
        id: 2,
        title: 'Áo lót đỏ',
        price: 159000,
        typeProduct: 'Áo lót',
        brand: "Gucci",
        color: "Hồng mạnh mẽ",
        imagePath: '/img/product/ao/ao_lot/aolot2'
    }),

    new Product.SP_aoLot ({
        id: 3,
        title: 'Áo lót đen',
        price: 219000,
        typeProduct: 'Áo lót',
        brand: "Routine",
        color: "đen",
        imagePath: '/img/product/ao/ao_lot/aolot3'
    }),
   
    new Product.SP_aoLot ({
        id: 4,
        title: 'Áo lót thêu hoa',
        price: 319000,
        typeProduct: 'Áo lót',
        brand: "Gucci",
        color: "Vàng gold",
        imagePath: '/img/product/ao/ao_lot/aolot4'
    }),
];  


for(let i = 0; i < aoLot.length; i++){
    // Save the new model instance, passing a callback
    aoLot[i].save(function (err,result) {
        done++;
        if(done===aoLot.length)
          exit();
     });
}
done = 0;


let aoSoMi = [
    new Product.SP_aoSoMi ({
        id: 1,
        title: 'Áo sơ mi nữ',
        price: 150000,
        typeProduct: 'Áo sơ mi',
        brand: "Pull&Bear",
        color: "Trắng",
        imagePath: '/img/product/ao/ao_so_mi/aosomi1'
    }),

    new Product.SP_aoSoMi ({
        id: 2,
        title: 'Áo sơ mi nam',
        price: 159000,
        typeProduct: 'Áo sơ mi',
        brand: "Gucci",
        color: "Trắng",
        imagePath: '/img/product/ao/ao_so_mi/aosomi2'
    }),

    new Product.SP_aoSoMi ({
        id: 3,
        title: 'Áo sơ mi cánh dơi',
        price: 219000,
        typeProduct: 'Áo sơ mi',
        brand: "H&M",
        color: "Trắng",
        imagePath: '/img/product/ao/ao_so_mi/aosomi3'
    }),
   
    new Product.SP_aoSoMi ({
        id: 4,
        title: 'Áo sơ mi tay dài thêu hoa',
        price: 319000,
        brand: "Routine",
        color: "Trắng",
        typeProduct: 'Áo sơ mi',
        imagePath: '/img/product/ao/ao_so_mi/aosomi4'
    }),
];  


for(let i = 0; i < aoSoMi.length; i++){
    // Save the new model instance, passing a callback
    aoSoMi[i].save(function (err,result) {
        done++;
        if(done===aoSoMi.length)
          exit();
     });
}
done = 0;
//===================================End area Ao============================

//===================================Giay area==============================
let giaySneaker = [
    new Product.SP_sneaker ({
        id: 1,
        title: 'Sneaker Passo kem',
        price: 150000,
        typeProduct: 'Sneaker',
        brand: "Gucci",
        color: "Vàng gold",
        imagePath: '/img/product/giay/sneaker/sneaker1'
    }),

    new Product.SP_sneaker ({
        id: 2,
        title: 'Sneaker nam cao cấp',
        price: 159000,
        typeProduct: 'Sneaker',
        brand: "Gucci",
        color: "Đen",
        imagePath: '/img/product/giay/sneaker/sneaker2'
    }),

    new Product.SP_sneaker ({
        id: 3,
        title: 'Chunky sneaker',
        price: 219000,
        typeProduct: 'Sneaker',
        brand: "Gucci",
        color: "Vàng gold",
        imagePath: '/img/product/giay/sneaker/sneaker3'
    }),
   
    new Product.SP_sneaker ({
        id: 4,
        title: 'Sneaker cao cấp đỏ',
        price: 319000,
        typeProduct: 'Sneaker',
        brand: "Gucci",
        color: "Hồng mạnh mẽ",
        imagePath: '/img/product/giay/sneaker/sneaker4'
    }),
];  


for(let i = 0; i < giaySneaker.length; i++){
    // Save the new model instance, passing a callback
    giaySneaker[i].save(function (err,result) {
        done++;
        if(done===giaySneaker.length)
          exit();
     });
}
done = 0;

let giayCaoCo = [
    new Product.SP_giayCaoCo ({
        id: 1,
        title: 'Giày cao cổ đen nam',
        price: 150000,
        typeProduct: 'Giày Cao cổ',
        brand: "H&M",
        color: "Đen",
        imagePath: '/img/product/giay/cao_co/caoco1'
    }),

    new Product.SP_giayCaoCo ({
        id: 2,
        title: 'Giày cao cổ trắng',
        price: 159000,
        typeProduct: 'Giày cao cổ',
        brand: "H&M",
        color: "Trắng",
        imagePath: '/img/product/giay/cao_co/caoco2'
    }),

    new Product.SP_giayCaoCo ({
        id: 3,
        title: 'Giày cao cổ vanz',
        price: 219000,
        typeProduct: 'Giày cao cổ',
        brand: "Mango",
        color: "Đen",
        imagePath: '/img/product/giay/cao_co/caoco3'
    }),
   
    new Product.SP_giayCaoCo ({
        id: 4,
        title: 'Giày cao cổ da độn',
        price: 319000,
        typeProduct: 'Giày cao cổ',
        brand: "Mango",
        color: "Vàng gold",
        imagePath: '/img/product/giay/cao_co/caoco4'
    }),
];  


for(let i = 0; i < giayCaoCo.length; i++){
    // Save the new model instance, passing a callback
    giayCaoCo[i].save(function (err,result) {
        done++;
        if(done===giayCaoCo.length)
          exit();
     });
}
done = 0;

let giayCaoGot = [
    new Product.SP_giayCaoGot ({
        id: 1,
        title: 'Giày cao gót đen',
        price: 150000,
        typeProduct: 'Giày Cao got',
        brand: "H&M",
        color: "Đen",
        imagePath: '/img/product/giay/cao_got/caogot1'
    }),

    new Product.SP_giayCaoGot ({
        id: 2,
        title: 'Giày cao cổ trơn mũi nhọn',
        price: 159000,
        typeProduct: 'Giày cao gót',
        brand: "Pull&Bear",
        color: "Đen",
        imagePath: '/img/product/giay/cao_got/caogot2'
    }),

    new Product.SP_giayCaoGot ({
        id: 3,
        title: 'Giày cao gót sandal',
        price: 219000,
        typeProduct: 'Giày cao gót',
        brand: "Routine",
        color: "Trắng",
        imagePath: '/img/product/giay/cao_got/caogot3'
    }),
   
    new Product.SP_giayCaoGot ({
        id: 4,
        title: 'Giày cao gót crazy',
        price: 319000,
        typeProduct: 'Giày cao gót',
        brand: "Mango",
        color: "Hồng mạnh mẽ",
        imagePath: '/img/product/giay/cao_got/caogot4'
    }),
];  


for(let i = 0; i < giayCaoGot.length; i++){
    // Save the new model instance, passing a callback
    giayCaoGot[i].save(function (err,result) {
        done++;
        if(done===giayCaoGot.length)
          exit();
     });
}
done = 0;

//=============================End giay area============================

function exit()
{
    mongoose.disconnect(); // saved!
}

