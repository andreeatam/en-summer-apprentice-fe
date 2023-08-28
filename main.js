import { createEventElement} from './components/createEventt';
import { createOrder } from  './components/createOrder';

// Navigate to a specific URL
function navigateTo(url) {
  history.pushState(null, null, url);
  renderContent(url);
}

// HTML templates
function getHomePageTemplate() {
  return `
   <div id="content" >
      <div class="events flex items-center justify-center flex-wrap text-center">
      </div>
    </div>
  `;
}


function getOrdersPageTemplate(orders){
  console.log(orders,'dsadasdasasddas');

  return `
    <div id="">
        <h1 class="text-2xl mb-4 mt-8 text-center">Purchased Tickets</h1>
            <table id="myTable">
            <tr>
                <th>Name</th>
                <th>Tickets</th>
                <th>Category</th>
                <th>Date</th>
                <th>Price</th>
                <th>Options</th>
            </tr>

              ${orders.map(order => {
                const orderElements = createOrder(order.ticketCategories,order);

                return `
                <tr>
                  <td>${order.eventName}</td>
                  <td><input value=${order.numberOfTickets}></input></td>
                  <td><select id="ticketType" name="ticketType" class="select ${orderElements.eventNameWithoutSpaces}-ticket-type border">
                  ${orderElements.ticketCategoryOptions}
                </select></td>
                  <td>${order.orderdAt}</td>
                  <td>${order.totalPrice}</td>
                  <td>${orderElements.editButton.outerHTML} ${orderElements.deleteButton.outerHTML}</td>
                `
              })}

            </table>

            <div id="tableContainer"></div>
 

    
    </div>
  `;
}


function setupNavigationEvents() {
  const navLinks = document.querySelectorAll('nav a');
  navLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const href = link.getAttribute('href');
      navigateTo(href);
    });
  });
}

function setupMobileMenuEvent() {
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }
}

function setupPopstateEvent() {
  window.addEventListener('popstate', () => {
    const currentUrl = window.location.pathname;
    renderContent(currentUrl);
  });
}

function setupInitialPage() {
  const initialUrl = window.location.pathname;
  renderContent(initialUrl);
}


function renderHomePage() {
  const mainContentDiv = document.querySelector('.main-content-component');
  mainContentDiv.innerHTML = getHomePageTemplate();

  fetchTicketEvents().then((data) => {
    console.log('function', data);
    addEvents(data);
  });

}


async function renderOrdersPage() {
  const orders = await fetchOrders();
  const test = getOrdersPageTemplate(orders);
  const mainContentDiv = document.querySelector('.main-content-component');
  mainContentDiv.innerHTML = test;
}



// Render content based on URL
function renderContent(url) {
  const mainContentDiv = document.querySelector('.main-content-component');
  mainContentDiv.innerHTML = '';

  if (url === '/') {
    renderHomePage();
  } else if (url === '/orders') {
    renderOrdersPage()
  }
}

// Call the setup functions
setupNavigationEvents();
setupMobileMenuEvent();
setupPopstateEvent();
setupInitialPage();


//----------------------
//----------------------
//----------------------


async function fetchTicketEvents(){
  const response = await fetch('http://172.16.98.82:7282/api/Event/GetAllEvents', {mode:'cors'});
  const data= await response.json();
  console.log(data);
  return data;
}

async function fetchOrders(){
  const response = await fetch('http://172.16.98.82:7282/api/Order/GetAllOrders', {mode:'cors'});
  const orders= await response.json();
  console.log(orders);
  return orders;
}


const addEvents = (events) => {
  const eventsDiv =document.querySelector('.events');
  eventsDiv.innerHTML='No events';
  if(events.length){
    console.log(events);
    eventsDiv.innerHTML='';
    events.forEach(event => {
      console.log(event);
      eventsDiv.appendChild(createEventElement(event));
    });
  }
};

const createEvent= (eventData) => {
  const title = eventData.eventType.name;
  const eventElement = createEventElement(eventData,title);
  return eventElement;
}
