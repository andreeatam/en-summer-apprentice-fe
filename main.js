// Navigate to a specific URL
function navigateTo(url) {
  history.pushState(null, null, url);
  renderContent(url);
}
// HTML templates
function getHomePageTemplate() {
  return `
   <div id="content" >
      <img src="./src/assets/Endava.png" alt="summer">
      <div class="events flex items-center justify-center flex-wrap">
      </div>
    </div>
  `;
}

function getOrdersPageTemplate() {
  return `
    <div id="content">
    <h1 class="text-2xl mb-4 mt-8 text-center">Purchased Tickets</h1>
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

//--------------------- pana aici nimic schimbat ----------------------------

//AICI IN FCT ASTA SE MODIFICA!!
function renderHomePage() {
  const mainContentDiv = document.querySelector('.main-content-component');
  mainContentDiv.innerHTML = getHomePageTemplate();

  renderEvents();
}

//NMC SCHIMBAT!
function renderOrdersPage(categories) {
  const mainContentDiv = document.querySelector('.main-content-component');
  mainContentDiv.innerHTML = getOrdersPageTemplate();
}

//-------------- NMC SCHIMBAT! --------------
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


async function fetchEvents(){
  try{
    const response = await fetch('http://localhost:7282/api/Event/GetAll', {mode:'cors'})
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const eventData = await response.json();
    return eventData;
  } catch (error) {
    console.error('Error fetching event data:', error);
    return [];
  }
}

async function renderEvents() {
 
    const eventData=fetchEvents();
    if (eventData !== null) {
      const eventsContainer = document.querySelector('.events');
      eventsContainer.innerHTML = ''; // Clear existing content

      const events = fetchEvents().then(events => events.forEach((eventDataItem) => {
        const eventCard = createEventCard(eventDataItem);
        eventsContainer.appendChild(eventCard);
      }));
    } else {
      // Handle the case when data fetch fails
      const eventsContainer = document.querySelector('.events');
      eventsContainer.innerHTML = 'Error fetching events';
    }
}

/*async function fetchDataFromServer(url) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Fetch error: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}


async function fetchAndRenderEvents() {
  try {
    const eventData = await fetchDataFromServer('http://localhost:8080/api/allEvents', {mode:'cors'});

    if (eventData !== null) {
      const eventsContainer = document.querySelector('.events');
      eventsContainer.innerHTML = ''; // Clear existing content

      eventData.forEach((eventDataItem) => {
        const eventCard = createEventCard(eventDataItem);
        eventsContainer.appendChild(eventCard);
      });
    } else {
      // Handle the case when data fetch fails
      const eventsContainer = document.querySelector('.events');
      eventsContainer.innerHTML = 'Error fetching events';
    }
  } catch (error) {
    //console.error(error);
  }
}*/


function createEventCard(eventData) {
  const eventCard = document.createElement('div');
  eventCard.classList.add('event-card'); 

  console.log(eventData);

  const contentMarkup = `
  <div class="bodystyle">
    <div class = "container">
      <div class = "item-container">
        <div class = "img-container">
          <img src = "https://e0.pxfuel.com/wallpapers/3/335/desktop-wallpaper-dj-party-background.jpg" alt="Event image"></img>
        </div>
        
        <div class = "body-container">
          <div class="overlay"></div>

          <div class="event-info">
            <p class="title"> ${eventData.eventName} </p>
            <div class="separator"></div>
            <p class="info"> ${eventData.TicketCategories[0].description} </p>
            <p class="price"> $${eventData.ticketCategory.price}</p>

            <div class="additional-info">
              <p class="info">
              <i class="fas fa-map-marker-alt"></i>
                ${eventData.venue.locationName}
              </p>
              <p class="info">
              <i class="fas fa-calendar-alt"></i>
                Data
              </p>

              <p class ="info description"> ${eventData.eventDescription}
              </p>
                
          </div>
        </div>
        <button class="action"> Buy ticket </button>
      </div>
    </div>
  </div>
  `;

  eventCard.innerHTML = contentMarkup;
  return eventCard;
}
