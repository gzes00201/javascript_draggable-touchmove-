//用此方法新增 var touch_move=new js_drag('#items-list > li');
function js_drag(box_item){
  let items = document.querySelectorAll(box_item)
  
  items.forEach(item => {

    item.setAttribute('draggable', true)

    item.addEventListener('dragstart', dragStart)
    item.addEventListener('drop', dropped)
    item.addEventListener('dragenter', cancelDefault)
    item.addEventListener('dragover', cancelDefault)
  })

  function get_index (box,item) {
    var nodes = Array.prototype.slice.call( box.children ),
        liRef = item;
      return nodes.indexOf( liRef );
  }

  function dragStart (e) {

    var index = get_index(document.getElementById('items-list'),e.target);
    e.dataTransfer.setData('text/plain', index)

  }

  function dropped (e) {
    cancelDefault(e)
    
    // get new and old index
    let oldIndex = e.dataTransfer.getData('text/plain')
    console.log(oldIndex);
    let target = e.target
    console.log(target);
    let newIndex = get_index(document.getElementById('items-list'),target);
    console.log(newIndex);
    // remove dropped items at old place
    let dropped = this.parentElement.children[oldIndex]
    this.parentElement.children[oldIndex].remove()
    
    // insert the dropped items at new place
    if (newIndex < oldIndex) {
      target.before(dropped)
    } else {
      target.after(dropped)
    }
  }

  function cancelDefault (e) {
    e.preventDefault()
    e.stopPropagation()
    return false
  }

}