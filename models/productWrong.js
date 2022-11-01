class Product {
  constructor(
    id,
    name,
    price,
    screen,
    backCamera,
    frontCamera,
    img,
    desc,
    type
  ) {
    this.id = id;
    this.price = price;
    this.screen = screen;
    this.backCamera = backCamera;
    this.frontCamera = frontCamera;
    this.img = img;
    this.desc = desc;
    this.type = type;
    this.name = name;
  }

  render(index) {
    let tableHTML = `<tr>
       <td>${index}</td>
       <td>${this.name}</td>
       <td>${this.price}</td>
       <td><img style="height: 100px;" src="${this.img}"</td>
       <td>${this.desc}</td>
       <td>
       <button class="btn btn-danger " onclick="deleteProduct('${this.name}')">Xóa</button>
       <button class="btn btn-info"  data-toggle="modal"
       data-target="#myModal" onclick="getUpdateProduct('${this.name}')">Sửa</button>
       </td>
     </tr>`;

    return tableHTML;
  }
}
