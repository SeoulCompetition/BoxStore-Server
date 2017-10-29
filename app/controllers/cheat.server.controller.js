var http = require("http");
var options = {
  hostname: 'net-durumi.cyber.go.kr/getMessage.do',
  path: '/theCheat',
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
  }
};


function setMessage(msg){
	$('#search_result').html(msg);
}

$(function() {
	$(document).ready(function() {
		var status = ""
		  ;
		if (status != "") {
			$("#search_result").html(status);
		}
	});

	$("#getXmlSearch").live('click', function() {
		if ( checkValidationXml() ) {
			callAjaxData("1");
		}
	});
});

function checkValidationXml() {
	if(! $(':input[name = "keyword"]').val()){
		alert('번호를 입력해주세요.');
		$("input[name = 'keyword']").focus();
		return false;
	}
	return true;
}

function callAjaxData(accessType)
{
	var $field 		= $(':radio[name="field"]:checked').val()
	  , $keyword 	= $(':input[name = "keyword"]').val()
		  , cybercopUrl = "http://net-durumi.cyber.go.kr/getMessage.do"
	  ;

	$.ajax({
		type: "POST"
		,url: cybercopUrl
		,dataType : "jsonp"
		,jsonp : "callback"
		,data : "fieldType="+$field+"&keyword="+$keyword+"&accessType="+accessType
		,contentType : "application/x-www-form-urlencoded; charset=utf-8"
		,error : function (request, status, error){
			$('#search_result').html("오류가 발생 되었습니다.");
		}
		,success: function(response, status, request) {
			$("#search_result").html(response["message"]);
		}
		,beforeSend : function() {
			$("#search_result").html("신고 여부를 확인 중입니다.");
		}
		,complete : function() {}
	 });
}
