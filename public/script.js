console.log("Sanity Check: JS is working!");

function addBook(book) {
  let theBooks = (
    '<li class="list-group-item item-'+book._id+'">'
      +'<button class="btn btn-danger delete-btn pull-right" data-id="'+book._id+'">Delete</button>'
      +'<div class="c">'
        +'<h2>'+book.title+'</h2>'
        +'<div class="addImage">'
          +'<img src="'+book.image+'">'
        +'</div>'
        +'<h3>'+book.author+'</h3>'
        +'<h5>'+book.releaseDate+'</h5>'
      +'</div>'
      +'</div class="editingForm">'
          +'<div class="list-group-item">'
            +'<button class="btn btn-primary edit-btn edit-'+book._id+'" data-id="'+book._id+'">Edit</button>'
            +'<button class="btn btn-success save-btn save-'+book._id+'" data-id="'+book._id+'">Save</button>'
            +'<span class="title-'+book._id+'">&nbsp;'+book.title+'</span>'
            +'<span class="form-inline edit-form input-'+book._id+'">&nbsp;<input class="form-control" value="'+book.title+'"/></span></div>'
          +'<div class="list-group-item">'
            +'<button class="btn btn-primary edit-btn edit-'+book._id+'" data-id="'+book._id+'">Edit</button>'
            +'<button class="btn btn-success save-btn save-'+book._id+'" data-id="'+book._id+'">Save</button>'
            +'<span class="title-'+book._id+'">&nbsp;'+book.image+'</span>'
            +'<span class="form-inline edit-form input-'+book._id+'">&nbsp;<input class="form-control" value="'+book.image+'"/></span></div>'
          +'<div class="list-group-item">'
            +'<button class="btn btn-primary edit-btn edit-'+book._id+'" data-id="'+book._id+'">Edit</button>'
            +'<button class="btn btn-success save-btn save-'+book._id+'" data-id="'+book._id+'">Save</button>'
            +'<span class="title-'+book._id+'">&nbsp;'+book.author+'</span>'
            +'<span class="form-inline edit-form input-'+book._id+'">&nbsp;<input class="form-control" value="'+book.author+'"/></span></div>'
          +'<div class="list-group-item">'
            +'<button class="btn btn-primary edit-btn edit-'+book._id+'" data-id="'+book._id+'">Edit</button>'
            +'<button class="btn btn-success save-btn save-'+book._id+'" data-id="'+book._id+'">Save</button>'
            +'<span class="title-'+book._id+'">&nbsp;'+book.releaseDate+'</span>'
            +'<span class="form-inline edit-form input-'+book._id+'">&nbsp;<input class="form-control" value="'+book.releaseDate+'"/></span></div>'
      +'</div>'
    +'</li>'
  )
  $('.list-group').append(theBooks)
}

function getAllBooks() {
  $.ajax({url: "https://mutably.herokuapp.com/books", 
    success: function(result) {
      let books = result.books
      for (let i = 0; i < books.length; i++) {
        addBook(books[i])
      }
    }
  })
} 

$(document).ready(function(){
  getAllBooks();
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
  $('.editingForm').hide() 
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

$(document).on('click', '.edit-btn', function() {
  var id = $(this).data('id')

  // hide the static title, show the input field
  $('.title-'+id).hide()
  $('.input-'+id).show()

  // hide the edit button, show the save button
  $('.edit-'+id).hide()
  $('.save-'+id).show()

  })

  $(document).on('click', '.save-btn', function() {
    var id = $(this).data('id')

    // grab the user's inputted data
    var updatedTitle = $('.input-'+id+' input').val()
    $.ajax({
      method: 'PUT',
      url: 'http://mutably.herokuapp.com/books/'+id,
      data: {title: updatedTitle},
      success: console.log('hello')
    })
  })

// function handleBookUpdateResponse(data) {
//   var id = data._id;

//   // replace the old title with the new title
//   $('.title-'+id).html('&nbsp;'+data.title)

//   $('.title-'+id).show()
//   $('.input-'+id).hide()
//   $('.edit-'+id).show()
//   $('.save-'+id).hide()
// }

// // $(document).on('click', '.editButton', function(event){
// //   let parent = $(this).parent()
// //   if($(this).html() === "Save") {
// //     let id = $(this).attr('id')
// //     let title = $('#editTitle').val()
// //     let img = $('#editImage').val()
// //     let auth =  $('#editAuthor').val()
// //     let relDate = $('#editReleaseDate').val() 
// //     let updatedBook = {
// //       title: title, 
// //       image: img,
// //       author: auth,
// //       releaseDate: relDate
// //     }
// //     let siblingTitle = parent.find(".addTitle")
// //     let siblingImage = parent.find(".addImage")
// //     let siblingAuthor = parent.find(".addAuthor")
// //     let siblingRelease = parent.find(".addReleaseDate")
// //     $.ajax({
// //       url: "https://mutably.herokuapp.com/books/"+id, 
// //       method: "PUT",
// //       data: updatedBook,
// //       success: function() {
// //         $('.editForm').hide()
// //         siblingTitle.replaceWith('<h1 class="addTitle">'+title+'</h1>')
// //         siblingImage.replaceWith('<img class="addImage" width= "70%" src="'+img+'"/>')
// //         siblingAuthor.replaceWith('<h2  class="addAuthor">'+auth+'</h2>')
// //         siblingRelease.replaceWith('<h5 class="addReleaseDate">'+relDate+'</h5>')
// //       }
// //     })
// //   }
// // })

// $(document).on('click', '.editButton', function(event){
//   if ($(this).html() === "Edit") {
//     let id = $(this).attr('id')
//     $(this).parent().parent().find('.editing-list').show()
//     $(this).parent().hide()
//   } else {$(this).html("Edit")}
//   $('#editTitle').val($(this).parent().find('.addTitle').html())
//   $('#editAuthor').val($(this).parent().find('.addAuthor').html())
//   $('#editImage').val($(this).parent().find('.addImage').attr('src'))
//   $('#editReleaseDate').val($(this).parent().find('.addReleaseDate').html())
//   $('.editForm').show()
// })

// function handleBookAddResponse(data) {
//   console.log(data);
//   getAllBooks();
// }





