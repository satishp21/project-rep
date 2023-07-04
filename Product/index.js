function addNewProduct(e){
    e.preventDefault();

    const productDetails = {
        productname: e.target.productname.value,
        description: e.target.description.value,
        quantity: e.target.quantity.value,
        price: e.target.price.value,
    }
    
    console.log(productDetails)
    const token  = localStorage.getItem('token')
    axios.post('http://localhost:3000/product/addproduct',productDetails,  { headers: {"Authorization" : token} })
        .then((response) => {
            // console.log(response,"this is the resposwe you are lookigng for")
        addNewProducttoUI(response.data.product);
    }).catch(err => showError(err))
}

function RPPvalue(){
    const token  = localStorage.getItem('token')
    const page = 1
    const selectElement = document.getElementById("RPP");
    const selectedValue = selectElement.value;
    localStorage.setItem('RPP',selectedValue)
    console.log(`Selected value: ${selectedValue}`);
    axios.get(`http://localhost:3000/product/getproducts${page}${selectedValue}`, { headers: {"Authorization" : token} })
    .then(response => {
            response.data.products.forEach(product => {
                addNewProducttoUI(product);
            })
            // console.log("this is response.data",response.data)
            showPagination(response.data.info)
    }).
    catch(err => {
        console.log(err)
        showError(err)
    })
    

}

function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

window.addEventListener('DOMContentLoaded', ()=> {
    const page = 1
    const token  = localStorage.getItem('token')
    const selectedValue  = localStorage.getItem('RPP') || 3
    const decodeToken = parseJwt(token)
    console.log(decodeToken)

    axios.get(`http://localhost:3000/product/getproducts${page}${selectedValue}`, { headers: {"Authorization" : token} })
    .then(response => {
            console.log(response,"ressssssssssssssssssssssssssssponseeeeeeeeeeee")
            response.data.products.forEach(product => {
                addNewProducttoUI(product);
            })
            // console.log("this is response.data",response.data)
            showPagination(response.data.info)
    }).catch(err => {
        console.log(err)
        showError(err)
    })
});

function addNewProducttoUI(product){
    const parentElement = document.getElementById('listOfProducts');
    const ProductElemId = `expense-${product.id}`;
    parentElement.innerHTML += `
        <li id=${ProductElemId}>
        Name ${product.name} - Description ${product.description} - quantity ${product.quantity} - price ${product.price}
            <button onclick="deleteProduct(event, '${product.id}')">
                Delete Product
            </button>
            <button onclick="BuyProduct(event, '${product.id}')">
            Buy Product
        </button>
        </li>`
}

function deleteProduct(e, productid) {
    const token = localStorage.getItem('token')
    axios.delete(`http://localhost:3000/product/deleteproduct/${productid}`,  { headers: {"Authorization" : token} }).then(() => {
        removeProductfromUI(productid);
    }).catch((err => {
        showError(err);
    }))
}

function BuyProduct(e, productid) {
    const product = {
        productid
    }
    axios.post(`http://localhost:3000/order/addorder`, product, { headers: {"Authorization" : token} }).then(() => { console.log("buyed product")
    }).catch((err => {
        showError(err);
    }))
}

function showError(err){
    document.body.innerHTML += `<div style="color:red;"> ${err}</div>`
}

function removeProductfromUI(productid){
    const productElemId = `product-${productid}`;
    document.getElementById(productElemId).remove();
}

function showPagination({currentPage,hasNextPage,hasPreviousPage,nextPage,previousPage,lastPage}){
    // let page = 1;
    try{
    const pagination = document.getElementById('pagination')
    
    pagination.innerHTML = '';

    if(hasPreviousPage){
        const button1 = document.createElement('button');
        button1.innerHTML = previousPage ;
        button1.addEventListener('click' , ()=>getPageProducts(previousPage))
        pagination.appendChild(button1)
    }

    const button2 = document.createElement('button');
    button2.classList.add('active')
    button2.innerHTML = currentPage ;
    button2.addEventListener('click' , ()=>getPageProducts(currentPage))
    pagination.appendChild(button2)

    if(hasNextPage){
        const button3 = document.createElement('button');
        button3.innerHTML = nextPage ;
        button3.addEventListener('click' , ()=>getPageProducts(nextPage))
        pagination.appendChild(button3)
    }
    }catch(err){
        console.log(err)
    }
}

function getPageProducts(page){
    const selectedValue  = localStorage.getItem('RPP') || 3
    const token  = localStorage.getItem('token')
    const parentElement = document.getElementById('listOfProducts');
    parentElement.innerHTML=''
    axios.get(`http://localhost:3000/product/getproducts${page}${selectedValue}`, { headers: {"Authorization" : token} })
    .then(response => {
            response.data.products.forEach(product => {
                addNewProducttoUI(product);
            })
            console.log("this is response.data",response.data.info)
            showPagination(response.data.info)
    }).catch(err => {
        showError(err)
    })
}