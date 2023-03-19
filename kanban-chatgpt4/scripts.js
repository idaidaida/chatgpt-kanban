

$(document).ready(function () {

    const dummyCards = [
      {
          title: "Task 1",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          tags: ["Tag 1", "Tag 2"]
      },
      {
          title: "Task 2",
          description: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          tags: ["Tag 2", "Tag "]
      }
    ];
    for (const cardData of dummyCards) {
      addCard("todo", cardData.title, cardData.description, cardData.tags);
    }
  
    const dummyCards2 = [
      {
          title: "Task 3",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          tags: ["Tag 3", "Tag 3"]
      },
      {
          title: "Task 4",
          description: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          tags: ["Tag 4", "Tag 4"]
      }
    ];
    for (const cardData of dummyCards2) {
      addCard("done", cardData.title, cardData.description, cardData.tags);
    }
  
  
    initKanbanBoard();
  
    function initKanbanBoard() {
  
  
  
        // Event listeners
        $(".add-card").on("click", openAddCardModal);
        $("#saveCard").on("click", saveCard);
  
        // Make the board columns sortable
        // $(".board-column").sortable({
        //     connectWith: ".board-column",
        //     placeholder: "card-placeholder",
        //     tolerance: "pointer",
        //     receive: function (event, ui) {
        //         // Update card status on drop
        //     }
        // });
        const columns = document.querySelectorAll('.board-column');
        columns.forEach(column => {
            new Sortable(column, {
                group: 'shared',
                animation: 150,
                onUpdate: function (event) {
                    // Update card status on drop
                }
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
        const cardId = $("#cardId").val();
        const columnId = $("#cardModal").data("columnId");
        const title = $("#cardTitle").val();
        const description = $("#cardDescription").val();
        const tags = $("#cardTags").val().split(",").map(tag => tag.trim());
  
        if (cardId) {
            // Update existing card
        } else {
            // Add new card
            addCard(columnId, title, description, tags);
        }
  
        $("#cardModal").modal("hide");
      }
  
      function addCard(columnId, title, description, tags) {
        const card = $(`
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${title}</h5>
                    <p class="card-text description">${description}</p>
                    <p class="card-text">
                        ${tags.map(tag => `<span class="badge bg-primary">${tag}</span>`).join('')}
                    </p>
                </div>
                <button class="btn btn-sm card-delete-btn">x</button>
            </div>
        `);
    
        card.on("click", ".card-delete-btn", deleteCard);
        card.on("click", openEditCardModal);
        $(`#${columnId}`).append(card);
    }
    
    function deleteCard(event) {
        event.stopPropagation();
        const card = $(this).closest(".card");
        card.remove();
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
  });
      
      
  