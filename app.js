document.addEventListener('DOMContentLoaded', function(){

  document.getElementById('copyright').appendChild(document.createTextNode(new Date().getFullYear()))

  const list = document.querySelector('#product-list ul');
  const forms = document.forms;


  // delete products
  list.addEventListener('click', (e) => {
    if(e.target.className == 'delete'){
      const li = e.target.parentElement;
      li.parentNode.removeChild(li);
    }
  });
  //edit Products
  list.addEventListener('click', (e) => {
    if(e.target.className == 'edit active'){
    e.target.parentElement.children[0].setAttribute('contenteditable','true');
    e.target.parentElement.children[3].classList.add('active');
    e.target.parentElement.children[2].classList.remove('active');
    }
  });

  list.addEventListener('click', (e) => {
    if(e.target.className == 'done active'){
    e.target.parentElement.children[0].setAttribute('contenteditable','false');
    e.target.parentElement.children[2].classList.add('active');
    e.target.parentElement.children[3].classList.remove('active');
    }
  });


  // add products
  const addForm = forms['add-product'];
  addForm.addEventListener('submit', function(e){
    e.preventDefault();

    // create elements
    const value = addForm.querySelector('input[type="text"]').value;
    const li = document.createElement('li');
    const productName = document.createElement('span');
    const deleteBtn = document.createElement('span');
    const editBtn = document.createElement('span');
    const doneBtn = document.createElement('span');
    const editAtr = document.createAttribute('contenteditable');

    // add text content
    productName.textContent = value;
    deleteBtn.textContent = 'delete';
    editBtn.textContent = 'edit';
    doneBtn.textContent = 'done'
    editAtr.value = "false"

    addForm.querySelector('input[type="text"]').value = "";

    // add classes
    productName.classList.add('name');
    deleteBtn.classList.add('delete');
    editBtn.classList.add('edit');
    editBtn.classList.add('active');
    doneBtn.classList.add('done');

    // append to DOM
    productName.attributes.setNamedItem(editAtr);
    li.appendChild(productName);
    li.appendChild(deleteBtn);
    li.appendChild(editBtn);
    li.appendChild(doneBtn);
    list.appendChild(li);
  });

  // hide products
  const hideBox = document.querySelector('#hide');
  hideBox.addEventListener('change', function(e){
    if(hideBox.checked){
      list.style.display = "none";
    } else {
      list.style.display = "initial";
    }
  });

  // filter products
  const searchBar = forms['search-products'].querySelector('input');
  searchBar.addEventListener('keyup', (e) => {
    const term = e.target.value.toLowerCase();
    const products = list.getElementsByTagName('li');
    Array.from(products).forEach((product) => {
      const title = product.firstElementChild.textContent;
      if(title.toLowerCase().indexOf(e.target.value) != -1){
        product.style.display = 'block';
      } else {
        product.style.display = 'none';
      }
    });
  });

  // tabbed content
  const tabs = document.querySelector('.tabs');
  const panels = document.querySelectorAll('.panel');
  tabs.addEventListener('click', (e) => {
    if(e.target.tagName == 'LI'){
      const targetPanel = document.querySelector(e.target.dataset.target);
      Array.from(panels).forEach((panel) => {
        if(panel == targetPanel){
          panel.classList.add('active');
        }else{
          panel.classList.remove('active');
        }
      });
    }
  });
})
