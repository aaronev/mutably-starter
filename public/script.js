console.log("Sanity Check: JS is working!");

let defaultForm = {
  'title': 'Title',
  'image': 'Image',
  'author': 'Author',
  'releaseDate': 'Release Date'
}

function addBook(book){
  let li = $(
    '<a href=#><li class="book">'+
      '<div><h1><b>'+book.title +'</b></h1></div>'+
      '<div><img src="'+book.image+'" width="80%"/></div>'+
      '<div><h3>'+ book.author +'</h3></div>'+
      '<div>'+ book.releaseDate+'</div>'+
      '<div></a>'+
        '<button class="editButton saveButton">Edit</button>'+
        '<button class="deleteButton">Delete</button>'+
      '</div>'+
    '</li>'
  )
  li.data('book', book)
  $(".list-group").append(li)
}

function getAllBooks() {
  $.ajax({url: "https://mutably.herokuapp.com/books", 
    success: function(result) {
      let books = result.books
      console.log(books.length)
      for (let i = 0; i < books.length; i++) {
        addBook(books[i])
      } 
    }
  })
} 

$(document).ready(function(){
  getAllBooks()
})

$(document).on ('click', "#newBook", function(form) {
  event.preventDefault()
  info = {
    title: $('#title').val(),
    image: $('#image').val(),
    author: $('#author').val(),
    releaseDate: $('#releaseDate').val(), 
  }
  $.ajax({
    url: "https://mutably.herokuapp.com/books",
    method: "POST",
    data: info
  }) 
  addBook(info)
})

$(document).on('click', '.deleteButton', function(event) {
  let li = $(event.target).closest('.book')
  let id = li.data('book')._id
  $.ajax({ 
    method: 'DELETE',
    url: 'https://mutably.herokuapp.com/books/'+id,
    success: function() {
      console.log('success')
      li.fadeOut( function(){
        li.remove()
      })
    }
  }) 
})


$(document).on('click', '.editButton', function(value){


  // let form = $(
  //   '<a href=#><li class="book">'+
  //     '<div><h1><b>'+book.title +'</b></h1></div>'+
  //     '<div><img src="'+book.image+'" width="80%"/></div>'+
  //     '<div><h3>'+ book.author +'</h3></div>'+
  //     '<div>'+ book.releaseDate+'</div>'+
  //     '<div></a>'+
  //       '<button class="editButton">Edit</button>'+
  //       '<button class="deleteButton">Delete</button>'+
  //     '</div>'+
  //   '</li>'
  // )
  // form.data('form', form)

  if ($('.editButton').html() == "Edit") {
    $('.editButton').html("Save")
  } else {
    $('.editButton').html("Edit")
  }
})


// $(document).on('click', '.editButton', function(value){
//     $(".editButton").html('Edit', 'Save') 
// })


  // else {
  //   $(".editButton").html('Edit')
  // }
//   let li = $(event.target).closest('.book')
//   let id = li.data('book')._id
//   $.ajax({ 
//     method: 'DELETE',
//     url: 'https://mutably.herokuapp.com/books/'+id,
//     success: function() {
//       console.log('success')
//       li.fadeIn( function(){
//         console.log('hello')
//       })
//     }
//   })
// })

console.log("You've reached the end!")