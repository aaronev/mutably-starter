console.log("Sanity Check: JS is working!");

let allBookDataBase = []

function getAllBooks() {
  $.ajax({url: "https://mutably.herokuapp.com/books", 
    success: function(result) {
      let books = result.books
      for (let i = 0; i < books.length; i++) {
        allBookDataBase.push(books[i])
        addBook(books[i])
      }
    }
  })
} 

function addBook(book) {
  let title = '<h2 class="addTitle">'+book.title+'</h2>'
  let image = '<div><img class="addImage" width= "40%" src="'+book.image+'"/></div>'
  let author = '<h3  class="addAuthor">'+book.author+'</h3>'
  let releaseDate = '<div><h4 class="addReleaseDate">'+book.releaseDate+'</h4></div>'
  let editButton = '<button class="editButton" id='+book._id+'>Edit</button>'
  let deleteButton = '<button id='+book._id+' class="deleteButton">Delete</button>'
  let buttons = editButton + deleteButton
  let li =  image + title + author + releaseDate + buttons
  $('.list-group').append('<li class="book" id='+book._id+'>'+li+'</li>')
}

$(document).ready(function(event){
  getAllBooks()
  $('.editForm').hide()
})

$(document).on('click', "#newBook", function(event) {
  event.preventDefault()
  let title = $('#title').val()
  let image = $('#image').val()
  let author = $('#author').val()
  let releaseDate = $('#releaseDate').val()
  if (title || image || author || releaseDate) {
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
      success: function() {
        addBook(book),
        $('.list-group').empty(),
        getAllBooks()
      }
    })
  }
})

$(document).on('click', '.editButton', function(event){
  let parent = $(this).parent()
  if($(this).html() === "Save") {
    let id = $(this).attr('id')
    let title = $('#editTitle').val()
    let img = $('#editImage').val()
    let auth =  $('#editAuthor').val()
    let relDate = $('#editReleaseDate').val() 
    let updatedBook = {
      title: title, 
      image: img,
      author: auth,
      releaseDate: relDate
    }
    let siblingTitle = parent.find(".addTitle")
    let siblingImage = parent.find(".addImage")
    let siblingAuthor = parent.find(".addAuthor")
    let siblingRelease = parent.find(".addReleaseDate")
    $.ajax({
      url: "https://mutably.herokuapp.com/books/"+id, 
      method: "PUT",
      data: updatedBook,
      success: function() {
        $('.editForm').hide()
        siblingTitle.replaceWith('<h1 class="addTitle">'+title+'</h1>')
        siblingImage.replaceWith('<img class="addImage" width= "40%" src="'+img+'"/>')
        siblingAuthor.replaceWith('<h2  class="addAuthor">'+auth+'</h2>')
        siblingRelease.replaceWith('<h5 class="addReleaseDate">'+relDate+'</h5>')
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
  let id = $(this).attr('id')
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

console.log("Sanity Check: Um...Yeahh, JS does working!");