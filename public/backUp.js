console.log("Sanity Check: JS is working!");

$(document).ready(function(){
  getAllBooks()
})

$(document).on('click', '.editButton', function(event){
  console.log('entered click', $(event.target).siblings('.book-form'))
  $(event.target).siblings('.book-form').show()
  $(event.target).remove()
})
// let book = {
//   id: `${id}`,
// }

let saveForm = $(
  '<button type="button" class="btn btn-secondary" data-container="body" data-toggle="popover" data-placement="top" data-content="  <div id="light" class="white_content"><form id="new-Book" name="post-form" text-align="center" action="index.html" method="post">'+
  '<label for="title">Title</label><br>'+
  '<input default="Title" class="title" type="text" value="Title"><br>'+
  '<label for="image">Image</label><br>'+
  '<input default="Image" class="image" type="text" value="Image"><br>'+
  '<label for="author">Author</label><br>'+
  '<input default="Author" class="author" type="text" value="Author"><br>'+
  '<label for="releaseDate">Release Date</label><br>'+
  '<input default="Release Date" class="releaseDate" type="text" value="Release Date"><br>'+
  '</form><button="javascript:void(0)" id="save" onclick="save()".style.display="none";document.getElementById("fade").style.display="none">Save</button>'+
  '</div>'+
  '<div id="fade" class="black_overlay"></div></button>'
)

function makeBookForm(book){
  return '<div class="book-form" style="display:none">' +
  '<form id="new-Book" name="post-form" text-align="center" action="index.html" method="post">'+
  `<label for="title">Title</label><br>`+
  `<input class="title" type="text" value="${book.title}"><br>`+
  '<label for="image">Image</label><br>'+
  '<input default="Image" class="image" type="text" value="Image"><br>'+
  '<label for="author">Author</label><br>'+
  '<input default="Author" class="author" type="text" value="Author"><br>'+
  '<label for="releaseDate">Release Date</label><br>'+
  '<input default="Release Date" class="releaseDate" type="text" value="Release Date"><br>'+
  '<button="javascript:void(0)" id="save" type="submit" onclick="save()".style.display="none";document.getElementById("fade").style.display="none">Save</button>'
  '</form>' +
  '</div>'

}

function makeBookLayout(book) {
    return '<li id='+book._id+' class="book"><span class="edit-list">'+
    '<div><h1><b>'+book.title +'</b></h1></div>'+
    '<div><a href=#><img src="'+book.image+'" width="80%"/></a></div>'+
    '<div><h3>'+ book.author +'</h3></div>'+
    '<div>'+ book.releaseDate+'</div>'+
    '<button class="editButton" id='+book._id+'>Edit</button>' +
    makeBookForm(book) +
      '<button class="deleteButton" id='+book.id+'>Delete</button>'+
    '</div>'+
  '</span></li>'
}

function addBook(bookLayout){
  let li = $(bookLayout)
  $(".list-group").append(li)
}

function getAllBooks() {
  $.ajax({url: "https://mutably.herokuapp.com/books", 
    success: function(result) {
      let books = result.books
      console.log(books.length)
      for (let i = 0; i < books.length; i++) {
        addBook(books[i])
      } ;
    }
  })
} 

$(document).on('click', "#newBook", function(form) {
  let book = {
    title: $('#title').val(),
    image: $('#image').val(),
    author: $('#author').val(),
    releaseDate: $('#releaseDate').val(), 
  }
  $.ajax({
    url: "https://mutably.herokuapp.com/books",
    method: "POST",
    data: book,
    success: function(result){
      let bookLayout = makeBookLayout(book)
      addBook(bookLayout)
      getAllBooks()
    }
  }) 
})

$(document).on('click', '.deleteButton', function(event) {
  let li = $(event.target).closest('.book').attr('id')
  let id = $("li").attr('id')
  $.ajax({ 
    method: 'DELETE',
    url: 'https://mutably.herokuapp.com/books/'+id,
    success: function() {
      li.fadeOut( function(){
        li.remove()
      })
    }
  }) 
})

function save(event) {
  console.log($("li").parent('li'))
  let id = $(event.target).closest('li').attr('id')


  let info = {
    title: $('.title').val(),
    image: $('.image').val(),
    author: $('.author').val(),
    releaseDate: $('.releaseDate').val(), 
  }

  // let book = {}
  console.log(id)
  $.ajax({
    url: "https://mutably.herokuapp.com/books/"+id,
    succes: function(aBook) {
      book.title = aBook.title,
      book.image = aBook.image,
      book.author = aBook.author,
      book.releaseDate = aBook.releaseDate
    }
  })

  console.log(info.title)
  if (info.title === "Title") {
    book.title = info.title
    console.log('after', info.title)
  }
  if (info.image === "Image") {
    book.image = info.image
  }
  if (info.author === "Author") {
    book.author = info.author
  }
  if (info.releaseDate === "Release Date") {
    book.releaseDate = info.releaseDate
  }

  $.ajax({url: "https://mutably.herokuapp.com/books/"+id,
    method: 'PUT',
    data: info,
    success: function(book) {
      console.log("test")
    }
  })
  $(document).on('click', '#save', function(event){
  $(event.target).closest(saveForm).replaceWith(editButton)
})
}

console.log("You've reached the end!")