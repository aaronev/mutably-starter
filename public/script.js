console.log("Sanity Check: JS is working!");

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
  getAllBooks();
  $('.addForm').hide()
  $('.hideEditForm').hide()
})

$(document).on('click', "#addNewBook", function(event) {
  $('.addForm').show()
})

$(document).on('click', "#hideForm", function(event) {
  $('.addForm').hide()
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
      image: image || 'https://vignette1.wikia.nocookie.net/superfriends/images/a/a5/No_Photo_Available.jpg/revision/latest?cb=20090329133959', 
      author: author, 
      releaseDate: releaseDate
    } 
     $.ajax({
      url: "https://mutably.herokuapp.com/books",
      method: "POST",
      data: book,
      success: function() {
        addBook(book),
        $('.list-group').empty()
        getAllBooks()
      }
    })
  }
})

$(document).on('click', '.delete-btn', function() {
  let li = $(this).parent()
  let form = li.find('.list-group-item')
  let id = $(this).attr('data-id')
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

//////////////////////////WAS SO CLOSE NEEDED TO EDIT MORE BELOW/////////////////////////////////////////////////////////////////////////////////////////////////////

function addBook(book) {
  let theBooks = (
    '<li id='+book._id+' class="list-group-item item-'+book._id+'">'
      +'<div id='+book._id+' class="editted'+book._id+'">'
        +'<h2 value="title" class="editInfo title" id='+book._id+'>'+book.title+'</h2>'
        +'<div id='+book._id+' class="addImage">'
          +'<img class="editInfo image" id='+book._id+' src="'+book.image+'" value="image">'
        +'</div>'
        +'<h3 value="author" class="editInfo author" id='+book._id+'>'+book.author+'</h3>'
        +'<h5 value="releaseDate" class="editInfo releaseDate" id='+book._id+'>'+book.releaseDate+'</h5>'
        +'<button class="btn btn-primary edit-btn edit-'+book._id+'" data-id="'+book._id+'">Edit</button>'
        +'<button id='+book._id+' class="btn btn-success save-btn save-'+book._id+'" data-id="'+book._id+'">Save</button>'
        +'<span class="title-'+book._id+' spanView">'+book.title+'</span>'
        +'<span class="form-inline edit-form input-'+book._id+'"><input class="editingField" id="form-control"'+book._id+' placeholder="Click to Edit"/></span>'
        +'<button id='+book._id+' class="btn btn-danger delete-btn pull-right" data-id="'+book._id+'">Delete</button><br>'
    +'</li>'
  )
  $('.list-group').append(theBooks)
}

$(document).on('click', '.edit-btn', function() {
  let id = $(this).data('id') 
  let parent = $(this).parent()
  let val  = parent.find('.spanView').html()
  console.log(val)
  $('.editingField').attr('value', val)
  $('.spanView').show()
  $('.edit-form').hide()
  $('.edit-btn').show()
  $('.save-btn').hide()
  $('.title-'+id).hide()
  $('.input-'+id).show()
  $('.edit-'+id).hide()
  $('.save-'+id).show()
})

$(document).on('click', '.editInfo', function() {
  let value = $(this).html()
  let key = $(this).attr('value')
  if (!value) {
    value = $(this).attr('src')
  }
  console.log(value)
  let id = $(this).attr("id")
  $('.title-'+id).html(value)
  $('.editingField').attr('value', value)
  $('.editingField').attr('placeholder', key)
  console.log('(((((edit((((((', key)
})

$(document).on('click', '.save-btn', function(event) {
  event.preventDefault()
  let parent = $(this).parent()
  let id = $(this).attr('id')
  let key = $('.editingField').attr('placeholder')
  console.log('key######', key)
  let value = $('.editingField').val()
  console.log('######', value)
  let title = parent.find('.title').html()
  let image = parent.find('.image').attr('src')
  let author = parent.find('.author').html()
  let releaseDate = parent.find('.title').html()
  if (key === "title") {
    title = value
  }
   else if (key === "image") {
    image = value
  }
   else if (key === "author") {
    author = value
  }
   else if (key === "releaseDate") {
    releaseDate = value
  }
  let book = {
    title: title,
    image: image,
    author: author,
    releaseDate: releaseDate
  }
  console.log(book)
  $.ajax({
    method: 'PUT',
    url: 'http://mutably.herokuapp.com/books/'+id,
    data: book,
    success: function () {
      console.log('itworked')
      getAllBooks()
      parent.find('.title').html(title)
      parent.find('.image').attr('src', image)
      parent.find('.author').html(author)
      parent.find('.title').html(releaseDate)
    }
  })
    $('.title-'+id).show()
    $('.input-'+id).hide()
    $('.edit-'+id).show()
    $('.save-'+id).hide()
})