console.log("Sanity Check: JS is working!");

function form(title, image, author, releaseDate) {
  let book = {
    title: title,
    image: image,
    author: author,
    releaseDate: releaseDate
  }
  return book
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

function addBook(book) {
  let title = '<h1 class="addTitle">'+book.title+'</h1>'
  let image = '<img class="addImage" width= "80%" src="'+book.image+'"/>'
  let author = '<h2  class="addAuthor">'+book.author+'</h2>'
  let releaseDate = '<h5 class="addReleaseDate">'+book.releaseDate+'</h5>'
  let editButton = '<button class="editButton" id='+book._id+'>Edit</button>'
  let deleteButton = '<button id='+book._id+' class="deleteButton">Delete</button>'
  let buttons = editButton + deleteButton
  let li = title + image + author + releaseDate + buttons
  $('.list-group').append('<li class="book" id='+book._id+'>'+li+'</li>')
}

$(document).ready(function(){
  getAllBooks()
  $('.editForm').hide()
})

$(document).on('click', "#newBook", function(form) {
  let title = $('#title').val()
  console.log(title)
  let image = $('#image').val()
  let author = $('#author').val()
  let releaseDate = $('#releaseDate').val()
  let book = {
    title: title,
    image: image, 
    author: author, 
    releaseDate: releaseDate
  } 
   $.ajax({
    url: "https://mutably.herokuapp.com/books",
    method: "POST",
    data: book,
    success: addBook(book)
  })
})

$(document).on('click', '.editButton', function(event){
  let parent = $(this).parent()
  if($(this).html() === "Save") {
    let id = $(this).attr('id')
    let title = $('#editTitle').val()
    let img = $('#editImage').val()
    let auth =  $('#editAuthor').val()
    let relDate = $('#editReleaseDate').val() 
    let updatedBook = form(title, img, auth, relDate)
    $.ajax({
      url: "https://mutably.herokuapp.com/books/"+id, 
      method: "PUT",
      data: updatedBook,
      success: function() {
        $('.editForm').hide()
        parent.empty()
        addBook(updatedBook)
      }
    })
  }
})

$(document).on('click', '.editButton', function(event){
  if ($(this).html() === "Edit") {
    $(this).html("Save")
  } else {$(this).html("Edit")}
  $('#editTitle').val($(this).parent().find('.addTitle').html())
  $('#editAuthor').val($(this).parent().find('.addAuthor').html())
  $('#editImage').val($(this).parent().find('.addImage').attr('src'))
  $('#editReleaseDate').val($(this).parent().find('.addReleaseDate').html())
  $('.editForm').show()
})

$(document).on('click', '#cancel', function(event){
  $('.editForm').hide()
  $('.editButton').html('Edit')
})  

$(document).on('click', '.deleteButton', function(event) {
  let li = $(event.target).closest('.book')
  let id = $("li").attr('id')
  $.ajax({ 
    method: 'DELETE',
    url: 'https://mutably.herokuapp.com/books/'+id,
    success: function() {
      li.fadeOut(function(){
        li.remove()
      })
    }
  }) 
})

console.log("Sanity Check: Yeahh JS does working!");