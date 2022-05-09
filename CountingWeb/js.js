const p = document.querySelector("p");
const start=document.getElementById('start');
const reset=document.getElementById('reset');
const hour=document.getElementById('hour');
const min=document.getElementById('min');
const sec=document.getElementById('sec');
let h=hour.value;    
    let m=min.value;
    let s=sec.value;
let count=0;
let timeOut=false;

function countDown(){
    console.log('timeout:'+timeOut);
    // if(start.getAttribute('value')==='start'){
    //     timeOut=true;
    // }
    if(timeOut){
        // zero();
        timeOut=false;
        h=hour.value;
        m=min.value;
        s=sec.value;
        return      timeOut   ;

    }
    if(count===0){
        h=hour.value;
        m=min.value;
        s=sec.value;
    }
    s-=1;
    // console.log(timeOut, '  ',count,'  ',m,' ',s);
    if(s<0){
        
        if(h!=0&&m!=0){
            s=59;
            m-=1;
        }
        if(h!=0&&m==0){
            s=59;
            m=59;
            h-=1;
        }
        if(h==0&&m!=0){
            s=59;
            m-=1;
            ;
        }
        else{
            resetFunc();
            alert('Time Out!');
            timeOut=true;
            
        }        
    }    
    count++;
    if(!timeOut){
        p.textContent = h+' :'+m+' :'+s ;
        setTimeout(countDown,1000); 
    }    
}

function zero(){
    // timeOut=false;
    p.textContent = 00+' :'+00+' :'+00 ;
}
function resetFunc(){
    timeOut=true;
    p.textContent = 00+' :'+00+' :'+00 ;
    start.setAttribute('value','start');
    start.textContent='Start';
    h=hour.value;
    m=min.value;
    s=sec.value;
    // timeOut=false;

}
window.onload=zero;

start.addEventListener('click',checkStartButt);
reset.addEventListener('click',resetFunc);

function checkStartButt(){
    // console.log(start.getAttribute('value'));
    if(start.getAttribute('value')==='start'){
        start.textContent='Stop';
        start.setAttribute('value','stop');
        // console.log('in ifIsValue:'+start.getAttribute('value'));
        // console.log('in ifIsText:'+start.value);


        countDown();
    }
    else if(start.getAttribute('value')==='stop'){
        start.textContent='Start';
        start.setAttribute('value','start');
        // console.log('in ifIsNotText:'+start.value);
        // timeOut=true;



        // countDown();
    }
}  
