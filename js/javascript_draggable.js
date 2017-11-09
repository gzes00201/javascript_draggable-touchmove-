//用此方法新增 var touch_move=new js_drag('#items-list > li');
function js_drag(box_item){
  let items = document.querySelectorAll(box_item)
  let parent_box_type_tagName = document.querySelectorAll(box_item)[0].parentElement.tagName
  let parent_box_IdorClass='';
  if(document.querySelectorAll(box_item)[0].parentElement.getAttribute('id')){
      parent_box_IdorClass='#'+document.querySelectorAll(box_item)[0].parentElement.getAttribute('id');
  }else{
      parent_box_IdorClass='.'+document.querySelectorAll(box_item)[0].parentElement.getAttribute('class');
  }
  console.log(parent_box_IdorClass);
  let this_box_type_tagName = document.querySelectorAll(box_item)[0].tagName
  let this_box_IdorClass='';
  if(document.querySelectorAll(box_item)[0].getAttribute('id')){
      this_box_IdorClass='#'+document.querySelectorAll(box_item)[0].getAttribute('id');
  }else{
      this_box_IdorClass='.'+document.querySelectorAll(box_item)[0].getAttribute('class');
  }
  items.forEach(item => {

    item.setAttribute('draggable', true)

    item.addEventListener('dragstart', dragStart)
    item.addEventListener('drop', dropped)
    item.addEventListener('dragenter', cancelDefault)
    item.addEventListener('dragover', cancelDefault)

    item.addEventListener("touchstart", dragStart);
    item.addEventListener("touchend", dropped);
    item.addEventListener("touchcancel", cancelDefault);
    item.addEventListener("touchleave", dropped);
    item.addEventListener("touchmove", cancelDefault);
  })

  function get_index (box,item) {
    var nodes = Array.prototype.slice.call( box.children ),
        liRef = item;
      return nodes.indexOf( liRef );
  }

  function dragStart (e) {
    let this_dom=get_real_enm(e.target);
    if(this_dom){
        let index = get_index(document.getElementById('items-list'),this_dom);
        e.dataTransfer.setData('text/plain', index)
    }
  }
    function get_real_enm (this_dom) {
        while (this_dom.tagName!=this_box_type_tagName && !('#'+this_dom.getAttribute('id')==parent_box_IdorClass || '.'+document.querySelectorAll(box_item)[0].parentElement.getAttribute('class')==parent_box_IdorClass) && this_dom){
            //尋找正確的移動物件
            this_dom=this_dom.parentElement;
        }
        if(this_dom){
            return this_dom;
        }else{
            return null;
        }
    }
  function dropped (e) {
    cancelDefault(e)
    console.log(e.dataTransfer);
    // get new and old index
    let oldIndex = e.dataTransfer.getData('text/plain')
    console.log(oldIndex);
    let target = get_real_enm(e.target);
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
