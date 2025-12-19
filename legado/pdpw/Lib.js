
function recuperaQueryString(pQueryString) 
{
   hu = window.location.search.substring(1);
   gy = hu.split("&");
   for (i=0;i<gy.length;i++) 
   {
      ft = gy[i].split("=");
      if (ft[0] == pQueryString) 
      {
         return ft[1];
      }
   }
}

function MontaCabecalho()
{ 
   var valorQryString = recuperaQueryString("strAcesso");
                   
   if (valorQryString != "PDOC")
   {
      document.write('<IMG height="25" src="../pdpw/images/tit_sis_guideline.gif" width="179">');  
   }
   else
   {
	  document.write('<IMG height="25" src="../pdpw/images/tit_sis_guideline_pdpc.gif" width="179">');
   }
}
                
