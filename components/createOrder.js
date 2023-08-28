import { useStyle } from './helpers/styles';

//import { kebabCase } from "../utils";
//import { addLoader, removeLoader } from "./loader"; 

function formatDateToYearMonthDay(inputDate) {
  const parts = inputDate.split('/');
  const year = parts[2].length === 4 ? parts[2] : `20${parts[2]}`;
  const month = parts[0].padStart(2, '0');
  const day = parts[1].padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export const createOrder = (categories, order) => {
    const purchase = document.createElement('div');
    purchase.id = `purchase-${order.orderId}`; //aici
    purchase.classList.add(...useStyle('purchase'));
    //purchase.style.display = 'flex';

    const purchaseTitle = createParagraph(...useStyle('purchaseTitle'));
    purchaseTitle.innerText = order.eventName;
    purchase.appendChild(purchaseTitle);
    //s purchaseTitle.style.textAlign ='center';

    const purchaseQuantity = createInput(...useStyle('purchaseQuantity'));
    purchaseQuantity.type = 'number';
    purchaseQuantity.min = '1';
    purchaseQuantity.value = `${order.numberOfTickets}`;
    purchaseQuantity.disabled = true;
    //purchaseQuantity.style.textAlign ='auto';

    const purchaseQuantityWrapper = createTr(...useStyle('purchaseQuantityWrapper'));
    purchaseQuantityWrapper.append(purchaseQuantity);
    purchase.appendChild(purchaseQuantityWrapper);

    const purchaseType = createSelect(...useStyle('purchaseTypeWrapper'));
    purchaseType.setAttribute('disabled','true');


    let ticketCategoryOptions = new Array();
    //aici
    const buyedOptionString = `<option value=${order.ticketCategories.ticketCategoryId}>${order.ticketCategories.description} &nbsp ${order.ticketCategories.price} $</option>`;
    ticketCategoryOptions.push(buyedOptionString)


    // order.event.listTicketCategory.map(
    // (tc) =>{
    //   if(tc.ticketCategoryId != order.ticketCategories.ticketCategoryId){
    //     const str = `<option value=${tc.ticketCategoryId}>${tc.description} &nbsp $${tc.price}</option>`;
    //     ticketCategoryOptions.push(str);
    //   }
    // }
    // );

    const eventNameWithoutSpaces = order.eventName.replace(/\s/g, '');
    const ticketTypeMarkup = `
    <select id="ticketType" name="ticketType" class="select ${eventNameWithoutSpaces}-ticket-type border">
      ${ticketCategoryOptions}
    </select>
    `;
    purchaseType.innerHTML = ticketTypeMarkup;


    // const purchaseTypeDiv = document.createElement('div');
    // purchaseTypeDiv.classList.add(...useStyle('purchaseTypeWrapper'));
    // purchaseTypeDiv.append(purchaseType);
    // purchase.appendChild(purchaseTypeDiv);

    

    // const purchaseTypeWrapper = createDiv(...useStyle('purchaseTypeWrapper'));
    // purchaseTypeWrapper.append(purchaseType);
    // purchase.appendChild(purchaseTypeWrapper);

    const purchaseTypeTr = document.createElement('tr');
    purchaseTypeTr.classList.add(...useStyle('purchaseTypeWrapper'));
    purchaseTypeTr.append(purchaseType);
    purchase.appendChild(purchaseTypeTr);

    
    const purchaseTypeWrapper = createTr(...useStyle('purchaseTypeWrapper'));
    purchaseTypeWrapper.append(purchaseType);
    purchase.appendChild(purchaseTypeWrapper);


    // const purchaseTypeWrapper = createDiv(...useStyle('purchaseTypeWrapper'));
    // purchaseTypeWrapper.append(purchaseType);
    // purchase.appendChild(purchaseTypeWrapper);

    const purchaseDate = createDiv(...useStyle('purchaseDate'));

    const currentDate = new Date();
    const currentDateString = currentDate.toLocaleDateString();
    purchaseDate.innerText = new Date(currentDateString).toLocaleDateString();

    purchase.appendChild(purchaseDate);

    const purchasePrice = createDiv(...useStyle('purchasePrice'));
    purchasePrice.innerText = order.totalPrice;
    purchase.appendChild(purchasePrice);


    const actions = createDiv(...useStyle('actions'));

    const editButton = createButton([...useStyle(['actionButton', 'editButton'])], '<i class="fa-solid fa-pencil"></i>', doNothing);
    actions.appendChild(editButton);
    
    const saveButton = createButton([...useStyle(['actionButton', 'hiddenButton', 'saveButton'])], '<i class="fa-solid fa-check"></i>', doNothing);
    actions.appendChild(saveButton);

    const cancelButton = createButton([...useStyle(['actionButton', 'hiddenButton', 'cancelButton'])], '<i class="fa-solid fa-xmark"></i>', doNothing);
    actions.appendChild(cancelButton);

    const deleteButton = createButton([...useStyle(['actionButton', 'deleteButton'])], '<i class="fa-solid fa-trash-can"></i>', doNothing);
    actions.appendChild(deleteButton);
    // Assuming you have a reference to the buttons like cancelButton and deleteButton

    
    purchase.appendChild(actions);


    function createDiv(...classes) {
        const div = document.createElement('div');
        div.classList.add(...classes);
        return div;
    }

    function createTr(...classes) {
        const tr = document.createElement('tr');
        tr.classList.add(...classes);
        return tr;
    }

    function createParagraph(...classes) {
        const p = document.createElement('p');
        p.classList.add(...classes);
        return p;
    }

    function createInput(...classes) {
        const input = document.createElement('input');
        input.classList.add(...classes);
        return input;
    }

    function createSelect(...classes) {
        const select = document.createElement('select');
        select.classList.add(...classes);
        return select;
    }

    function createButton(classes, innerHTML, handler) {
        const button = document.createElement('button');
        button.classList.add(...classes);
        button.innerHTML = innerHTML;
        button.addEventListener('click', handler);
        return button;
    }

    function doNothing() {
        console.log("Hi bye!");
    }



    
    //console.log('aaaaaaaaaaaaaaaaaaaaa', purchase);
 return {
    purchase: purchase,
    editButton: editButton,
    deleteButton: deleteButton,
    ticketCategoryOptions:ticketCategoryOptions,
    eventNameWithoutSpaces:eventNameWithoutSpaces
  };
};





