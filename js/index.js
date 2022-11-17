var productList = [];

const creatProduct = () => {
  // 1. Lấy input
  var id = Math.floor(Math.random() * 100);
  var productName = document.getElementById("nameProduct").value;
  var productPrice = +document.getElementById("productPrice").value;
  var productScreen = document.getElementById("productScreen").value;
  var backCamera = document.getElementById("backCamera").value;
  var frontCamera = document.getElementById("frontCamera").value;
  var productImage = document.getElementById("productImage").value;
  var productDetail = document.getElementById("productDetail").value;
  var productType = document.getElementById("productType").value;

  // 2. Tạo đối tượng mới
  var newProduct = new Product(
    id,
    productName,
    productPrice,
    productScreen,
    backCamera,
    frontCamera,
    productImage,
    productDetail,
    productType
  );
  console.log(newProduct);
  // 3. Push đối tượng vào mảng cách này chỉ dùng trong local
  // productList.push(newProduct);

  // 4. In đối tượng ra màn hình cách này chỉ dùng trong local
  // renderProduct(productList);

  // 5. Lưu đối tượng vào local ---------------- Lưu đối tượng vào api
  // setProdcutList();
  // -----------------------------------------
  // gửi request xuống backend kèm theo đối tượng sinh viên mới => thêm sinh viên
  // request = header + body (data)
  var promise = axios({
    url: "https://6336fc765327df4c43cdbeb7.mockapi.io/mobileStore",
    method: "POST",
    data: newProduct,
  });

  promise
    .then(function (res) {
      console.log(res.data);
      getProductList();
    })
    .catch(function (error) {
      console.log(error);
    });
};

window.onload = () => {
  document.getElementById("btnThemSP").addEventListener("click", creatProduct);
  document
    .getElementById("btnCapNhat")
    .addEventListener("click", updateProduct);
  getProductList();
};

function renderProduct(data) {
  var tableHTML = "";
  for (index in data) {
    var currentData = data[index];
    tableHTML += `
    <tr>
    <td>${currentData.id}</td>
    <td>${currentData.name}</td>
    <td>${currentData.price}</td>
    <td><img style="height: 100px;" src="${currentData.img}"</td>
    <td>${currentData.desc}</td>
    <td>
    <button class="btn btn-danger " onclick="deleteProduct('${currentData.id}')">Xóa</button>
    <button class="btn btn-info"  data-toggle="modal"
    data-target="#myModal" onclick="getUpdateProduct('${currentData.id}')">Sửa</button>
    </td>
  </tr>
    `;
  }
  document.getElementById("tableDanhSach").innerHTML = tableHTML;
}

function setProdcutList() {
  var prodcutListJSON = JSON.stringify(productList);
  localStorage.setItem("PL", prodcutListJSON);
}

const getProductList = async () => {
  try {
    var res = await axios({
      url: "https://6336fc765327df4c43cdbeb7.mockapi.io/mobileStore",
      method: "GET",
    });
    console.log(res.data);
    productList = res.data;
    renderProduct(productList);
  } catch (error) {
    console.log(error);
  }
  //các hàm đặt dưới function try catch đều bị await
  document.getElementById("btnCapNhat").style.display = "none";
};

var currentId;

async function deleteProduct(productId) {
  try {
    var res = await axios({
      url:
        "https://6336fc765327df4c43cdbeb7.mockapi.io/mobileStore/" + productId,
      method: "DELETE",
    });
    console.log(res);
    getProductList();
  } catch (error) {
    console.log(error);
  }
}

function findByID(data) {
  for (index in productList) {
    if (productList[index].id == data) {
      return index;
    }
  }
  return -1;
}

async function getUpdateProduct(productId) {
  // Ẩn nút thêm và hiện cập nhật
  document.getElementById("btnThemSP").style.display = "none";
  document.getElementById("btnCapNhat").style.display = "inline-block";
  currentId = productId;
  try {
    var res = await axios({
      url:
        "https://6336fc765327df4c43cdbeb7.mockapi.io/mobileStore/" + productId,
      method: "GET",
    });
    var product = res.data;

    document.getElementById("nameProduct").value = product.name;
    document.getElementById("productPrice").value = product.price;
    document.getElementById("productScreen").value = product.screen;
    document.getElementById("backCamera").value = product.backCamera;
    document.getElementById("frontCamera").value = product.frontCamera;
    document.getElementById("productImage").value = product.img;
    document.getElementById("productDetail").value = product.desc;
    document.getElementById("productType").value = product.type;
  } catch (err) {
    console.log(err);
  }
}

function updateProduct() {
  var productName = document.getElementById("nameProduct").value;
  var productPrice = +document.getElementById("productPrice").value;
  var productScreen = document.getElementById("productScreen").value;
  var backCamera = document.getElementById("backCamera").value;
  var frontCamera = document.getElementById("frontCamera").value;
  var productImage = document.getElementById("productImage").value;
  var productDetail = document.getElementById("productDetail").value;
  var productType = document.getElementById("productType").value;

  var newProduct = new Product(
    currentId,
    productName,
    productPrice,
    productScreen,
    backCamera,
    frontCamera,
    productImage,
    productDetail,
    productType
  );

  console.log(newProduct);

  // Đóng và hiện lại nút thêm
  // document.getElementById("btnDong").click();
  document.getElementById("btnCapNhat").setAttribute("data-dismiss", "modal");
  //Dùng thuộc tính set Attribute cho thẻ cập nhật
  document.getElementById("btnThemSP").style.display = "inline-block";
  // document.getElementById("btnCapNhat").style.display = "none";
  var promise = axios({
    url: "https://6336fc765327df4c43cdbeb7.mockapi.io/mobileStore/" + currentId,
    method: "PUT",
    data: newProduct,
  });

  promise
    .then(function (res) {
      console.log(res.data);
      getProductList();
    })
    .catch(function (error) {
      console.log(error);
    });
}

function searchItem() {
  console.log(productList);
  var keyword = document
    .querySelector("#searchName")
    .value.toLowerCase()
    .trim();
  var result = [];
  for (var i = 0; i < productList.length; i++) {
    // var username = staffList[i].username.toLowerCase();
    // var fullname = staffList[i].fullname.toLowerCase();
    var idSearch = productList[i].id;
    var evaluate = productList[i].name.toLowerCase();
    if (idSearch === keyword || evaluate.includes(keyword)) {
      result.push(productList[i]);
    }
    // if (evaluate.includes(keyword)) {
    //   result.push(productList[i]);
    // }
  }
  console.log(result);
  renderProduct(result);
}
