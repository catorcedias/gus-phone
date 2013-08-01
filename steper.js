//Author: Gustavo Mario Bertenasco (gusberte@gmail.com)
//Date: 23/07/2013
//
//Ejemplo de uso:
//	El siguiente ejemplo inicializa el steper horizontal y le agrega 4 pasos, en cada paso se llama a una funcion correspondiente al paso (gotoStep1, gotoStep2)
//	Si se desea un steper vertical, solo se deja en null el último parámetro
//
//	var steper = new Steper( "#slider","#sliderbtn","horizontal");
//	steper.addStep( gotoStep1 );
//	steper.addStep( gotoStep2 );
//	steper.addStep( gotoStep3 );
//	steper.addStep( gotoStep4 );
//
// 	function gotoStep1(){ alert("Paso1"); }
//  function gotoStep2(){ alert("Paso2"); }
//  function gotoStep3(){ alert("Paso3"); }
//  function gotoStep4(){ alert("Paso4"); }

function Steper( idContainer, idButton, orientation ){
	var self= this;
	this.steps = new Array();
	this.orientation = orientation;
	
	this.addStep = function( callback ){
		this.steps[ this.steps.length]=callback;
	}
	
	$(idButton).draggable({ containment: "parent",drag: function( event, ui ) {   
			
		
			
		}, stop: function( event, ui ) {
			
			var perc=0;
			if ( orientation == "horizontal"){
				perc = (ui.position.left / $(idContainer).width());				
			}else{
				perc = 1- (ui.position.top / $(idContainer).height());	
			}
			
			var range = 1 / (self.steps.length-1);
			var percAux=0;
			for( var i=0; i< self.steps.length; i++){
				percAux = i * range;
	
				if( perc >= percAux - (range/2) && perc <= percAux +(range/2) ){
					
					if ( orientation == "horizontal"){
						$(idButton).animate({ left: (percAux * ($(idContainer).width() - $(idButton).width()))  +"px" },300,null,self.steps[i]);
					}else{
						$(idButton).animate({ top:(percAux *$(idContainer).height())+"px" },300,null,self.steps[i]);	
					}
					break;		
				}
			}
		
			//$("#debuger").html( perc);
		}
	});
	
}
