$(document).ready(function () {

    // Add a new array to store card data
    let cardDataList = [];
  
    initDummyData();
    initKanbanBoard();
  
    function initDummyData() {
        loadFromLocalStorage();
    }
  
    function initKanbanBoard() {
      
        // Event listeners
        $(".add-card").on("click", openAddCardModal);
        $("#saveCard").on("click", saveCard);
  
        const columns = document.querySelectorAll(".board-column");
        columns.forEach((column) => {
          new Sortable(column, {
            group: "shared",
            animation: 150,
            handle: '.card', // Add this line to exclude the "Add Card" button from being draggable
            onEnd: function (event) {
              const oldColumnId = event.from.getAttribute("id");
              const newColumnId = event.to.getAttribute("id");
              updateCardColumn(event.item, oldColumnId, newColumnId);
            },
          });
        });
        
        
        

    }
  
    function openAddCardModal() {
        const columnId = $(this).parent().attr("id");
        $("#cardId").val("");
        $("#cardTitle").val("");
        $("#cardDescription").val("");
        $("#cardTags").val("");
        $("#cardModal").data("columnId", columnId).modal("show");
    }
  
    function saveCard() {
      const cardId = parseInt($("#cardId").val());
      const columnId = $("#cardModal").data("columnId");
      const title = $("#cardTitle").val();
      const description = $("#cardDescription").val();
      const tags = $("#cardTags").val().split(",").map(tag => tag.trim());
  
      if (!isNaN(cardId)) {
        // Update existing card
        updateCard(cardId, columnId, title, description, tags);
      } else {
        // Add new card
        addCard(columnId, title, description, tags);
      }
  
      $("#cardModal").modal("hide");
    }
  
    function addCard(columnId, title, description, tags) {
        const cardData = { title, description, tags };
        const card = createCardElement(cardData);
  
        card.on("click", ".card-delete-btn", deleteCard);
        card.on("click", openEditCardModal);
        $(`#${columnId}`).append(card);
  

        // Save card data
        const index = $(`#${columnId} .card`).length - 1;
        cardDataList.push({ columnId, cardData: { index, title, description, tags } });
        saveToLocalStorage();
    }
  
    function updateCard(cardId, columnId, title, description, tags) {
        const cardData = { title, description, tags };
        const card = createCardElement(cardData);
  
        card.on("click", ".card-delete-btn", deleteCard);
        card.on("click", openEditCardModal);
        $(`#${columnId} .card`).eq(cardId).replaceWith(card);
  
        // Update card data
        cardDataList[cardId].cardData = { index: cardId, title, description, tags };
        saveToLocalStorage();
    }
  
    function deleteCard(event) {
        event.stopPropagation();
        const card = $(this).closest(".card");
        const columnId = card.closest(".board-column").attr("id");
      
        // Find the card data in the cardDataList
        const cardTitle = card.find(".card-title").text();
        const cardDescription = card.find(".description").text();
        const cardTags = card.find(".badge").map(function () {
          return $(this).text();
        }).get();
        
        // Remove the card from the cardDataList array
        cardDataList = cardDataList.filter((cardData) => {
          return !(
            cardData.columnId === columnId &&
            cardData.cardData.title === cardTitle &&
            cardData.cardData.description === cardDescription &&
            JSON.stringify(cardData.cardData.tags) === JSON.stringify(cardTags)
          );
        });
      
        // Save the updated cardDataList to local storage
        saveToLocalStorage();
      
        card.remove();
      }
      

      function updateCardColumn(cardElement, oldColumnId, newColumnId) {
        const card = $(cardElement);
      
        // Find the card data in the cardDataList
        const cardTitle = card.find(".card-title").text();
        const cardDescription = card.find(".description").text();
        const cardTags = card.find(".badge").map(function () {
          return $(this).text();
        }).get();

        console.log("cardElement:"+ JSON.stringify(card));
        console.log("oldColumnId:" + oldColumnId);
        console.log("cardTitle:" + cardTitle);
        console.log("cardDescription:" + cardDescription);
        console.log("cardTags:" + JSON.stringify(cardTags));
      
        // Update the columnId for the found card data
        for (let i = 0; i < cardDataList.length; i++) {
          if (
            cardDataList[i].columnId === oldColumnId &&
            cardDataList[i].cardData.title === cardTitle &&
            cardDataList[i].cardData.description === cardDescription &&
            JSON.stringify(cardDataList[i].cardData.tags) === JSON.stringify(cardTags)
          ) {
            cardDataList[i].columnId = newColumnId;
            break;
          }
        }
      
        // Save the updated cardDataList to local storage
        saveToLocalStorage();
      }
      
      

    // Save card data to local storage
    function saveToLocalStorage() {
      localStorage.setItem('cardDataList', JSON.stringify(cardDataList));
    }
  
    function openEditCardModal() {
        const card = $(this);
        const columnId = card.closest(".board-column").attr("id");
        const title = card.find(".card-title").text();
        const description = card.find(".description").text();
        const tags = card.find(".badge").map(function () {
            return $(this).text();
        }).get().join(", ");
    
        $("#cardId").val(card.index());
        $("#cardTitle").val(title);
        $("#cardDescription").val(description);
        $("#cardTags").val(tags);
        $("#cardModal").data("columnId", columnId).modal("show");
    }

    // Load card data from local storage
    function loadFromLocalStorage() {
      const savedData = localStorage.getItem('cardDataList');

      if (savedData) {
        const parsedData = JSON.parse(savedData);
        for (const cardDataItem of parsedData) {
          addCard(cardDataItem.columnId, cardDataItem.cardData.title, cardDataItem.cardData.description, cardDataItem.cardData.tags);
        }
      }
    }
  
    // Create a separate function to generate a card element
    function createCardElement(cardData) {
      return $(`
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">${cardData.title}</h5>
                <p class="card-text description">${cardData.description}</p>
                <p class="card-text">
                    ${cardData.tags.map(tag => `<span class="badge bg-primary">${tag}</span>`).join('')}
                </p>
            </div>
            <button class="btn btn-sm card-delete-btn">x</button>
        </div>
      `);
    }

});

$("#searchInput").on("input", filterCardsByText);
$("#searchButton").on("click", filterCardsByText);


function filterCardsByText() {
  const searchText = $("#searchInput").val().toLowerCase();

  $(".card").each(function () {
    const cardTitle = $(this).find(".card-title").text().toLowerCase();
    const cardDescription = $(this).find(".description").text().toLowerCase();
    const cardTags = $(this).find(".badge").text().toLowerCase();

    if (
      cardTitle.includes(searchText) ||
      cardDescription.includes(searchText) ||
      cardTags.includes(searchText)
    ) {
      $(this).show();
    } else {
      $(this).hide();
    }
  });
}


// At the bottom of the file
if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('sw.js')
      .then((registration) => {
        console.log('Service Worker registered with scope:', registration.scope);
      })
      .catch((error) => {
        console.error('Service Worker registration failed:', error);
      });
  }
  