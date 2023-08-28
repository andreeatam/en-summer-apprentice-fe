import { useStyle } from './helpers/styles';
import { addPurchase } from './helpers/utils';
import { addLoader, removeLoader } from './loader';

function addImage(name){
    var imagesrc;
    if(name =="Untold"){
      imagesrc ="https://static.infomusic.ro/media/2019/08/Untold_2019_023.jpg";
    }
    else
    if(name =="Electric Castle"){
      imagesrc ="https://static.infomusic.ro/media/2021/07/electric-castle-castel-banffy.jpg";
    }
    else
    if(name =="Meci de fotbal"){
      imagesrc ="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBTY4MwDtjRrDKCVjROqcAEpJQGzh6xC99IA&usqp=CAU";
    }
    else
    if(name =="Wine Festival"){
      imagesrc ="https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F499209509%2F160756522343%2F1%2Foriginal.20230424-025429?w=600&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C0%2C2160%2C1080&s=e20c03ae2eddf5028de9c83b1503dd11"; 
    }
    return imagesrc;
}

export const createEventElement = (eventData,title) => {
  const {eventId,name,description,img,venue,ticketCategories} = eventData;
  const eventDiv =document.createElement('div');
  const eventWrapperClasses = useStyle('eventWrapper');
  const actionsWrapperClasses = useStyle('actionsWrapper');
  const quantityClasses = useStyle('quantity');
  const inputClasses = useStyle('input');
  const quantityActionsClasses = useStyle('quantityActions');
  const increaseBtnClasses = useStyle('increaseButton');
  const decreaseBtnClasses = useStyle('decreaseButton');
  const addToCartBtnClasses = useStyle('addToCartBtn');

  eventDiv.classList.add(...eventWrapperClasses); //adaugam clase

  var imageurl = addImage(name);

  const contentMarkup = `
    <header>
      <h2 class="event-title text-2xl font-bold">${name}</h2>
    </header>
    <div class="content">
    <img src="${imageurl}" alt="${name}" class="flex justify-center event-image w-full height-auto rounded object-cover"></img>
      <p class="description text-gray-700 text-center font-bold">${description}</p>
      <p class="location text-gray-700 text-center  ml-2">${venue}</p>
     
    </div>
  `;

  eventDiv.innerHTML = contentMarkup;
  const evContainer = document.querySelector('.events');
  evContainer.appendChild(eventDiv);

  const actions = document.createElement('div');
  actions.classList.add(...actionsWrapperClasses);

  const categoriesOptions = ticketCategories.map(tc =>
    `<option value="${tc.ticketCategoryId}">${tc.description} - ${tc.price} $</option>`
  );

  const ticketTypeMarkup =`
      <h2 class="text-lg font-bold mb-2">Choose Ticket Type:</h2>
      <select id="ticketType" name="ticketType" class="border border">     
        ${categoriesOptions.join('\n')}
      </select>
    `;
  actions.innerHTML = ticketTypeMarkup;

  const quantity = document.createElement('div');
  quantity.classList.add(...quantityClasses);
  
  const input = document.createElement('input');
  input.classList.add(...inputClasses);
  input.type = 'number';
  input.min = '0';
  input.value = '0';

  input.addEventListener('blur', () => {
    if(!input.value) {
      input.value = 0;
    }
  });

  input.addEventListener('input', () => {
    const currentQuantity = parseInt(input.value);
    if(currentQuantity > 0) {
      addToCart.disabled = false;
    } else {
      addToCart.disabled = true;
    }
  });

  quantity.appendChild(input);

  const quantityActions = document.createElement('div');
  quantityActions.classList.add(...quantityActionsClasses);

  eventDiv.classList.add(...eventWrapperClasses); //adaugam clase

  const increase = document.createElement('button');
  increase.classList.add(...increaseBtnClasses);
  console.log('increase', increaseBtnClasses);
  
  increase.innerText = '+';
  increase.addEventListener('click', () => {
    input.value = parseInt(input.value) + 1;
    const currentQuantity = parseInt(input.value);
    if(currentQuantity > 0) {
      addToCart.disabled = false;
    } else {
      addToCart.disabled = true;
    }
  });

  const decrease = document.createElement('button');
  decrease.classList.add(...decreaseBtnClasses);
  decrease.innerText = '-';
  decrease.addEventListener('click', () => {
    const currentValue = parseInt(input.value);
    if(currentValue > 0) {
      input.value = currentValue -1;
    }
    const currentQuantity = parseInt(input.value);
    if(currentQuantity > 0) {
      addToCart.disabled = false;
    } else {
      addToCart.disabled = true;
    }
  });

  
  quantityActions.appendChild(increase);
  quantityActions.appendChild(decrease);

  quantity.appendChild(quantityActions);
  actions.appendChild(quantity);
  eventDiv.appendChild(actions);

  const eventFooter = document.createElement('footer');
  const addToCart = document.createElement('button');
  addToCart.classList.add(...addToCartBtnClasses);
  addToCart.innerText = 'Add To Cart';
  addToCart.disabled = true;

  //aici se va modif ceva!!!
  addToCart.addEventListener('click', () => {
    handledAddToCart(title, eventId, input, addToCart);

    addToCart.disabled = true;
    decrease.disabled = true;
    input.value = '0';
    document.querySelector('#ticketType').selectedIndex = 0; 
  });

  eventFooter.appendChild(addToCart);
  eventDiv.appendChild(eventFooter);

  return eventDiv;
}

//title=dupa ce sa cauta in pg, id=IdEvent, input=Standard/VIP
const handledAddToCart = (title,id,input,addToCart) => {
        const ticketType = id;
        console.log(ticketType)
        const quantity = input.value;
        if(parseInt(quantity)) {
          fetch('http://localhost:7282/api/Order/AddOrder',  {
            mode:'cors',
            method:"POST",
            headers:{
              "Content-Type":"application/json",
            },
            body:JSON.stringify( {
              ticketCategoryId:+ticketType,
              userId:+id,
              numberOfTickets:+quantity,
            })
        }).then((response) => {
          return response.json().then((data) => {
            if(!response.ok) {
              console.log("Something went wrong...");
            }
            return data;
          })
        }).then((data) => {
          addPurchase(data);
          console.log("Done!");
          input.value = 0;
          addToCart.disabled = true;
        });
      } else {
        //Not int. TO BE TREATED
      }
      
};