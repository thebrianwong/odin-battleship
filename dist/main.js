(()=>{"use strict";(()=>{const e=e=>{const t=["A","B","C","D","E","F","G","H","I","J"],a=["1","2","3","4","5","6","7","8","9","10"];for(let d=-1;d<10;d++)for(let l=-1;l<10;l++)if(-1===d)if(-1===l){const t=document.createElement("div");t.classList.add("gameboard-label"),t.style.visibility="hidden",e.appendChild(t)}else{const a=document.createElement("div");a.classList.add("gameboard-label"),a.textContent=t[l],e.appendChild(a)}else if(-1===l){const t=document.createElement("div");t.classList.add("gameboard-label"),t.textContent=a[d],e.appendChild(t)}else{const t=document.createElement("button");t.setAttribute("dataRow",d),t.setAttribute("dataColumn",l),t.classList.add("gameboard-cell"),e.appendChild(t)}};return{initializeBoardDOM:()=>{const t=document.querySelector(".player-board"),a=document.querySelector(".opponent-board");e(t),e(a)}}})().initializeBoardDOM()})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoibUJBQXNCLE1BQ3BCLE1BQU1BLEVBQW9CQyxJQUN4QixNQUNNQyxFQUFlLENBQUMsSUFBSyxJQUFLLElBQUssSUFBSyxJQUFLLElBQUssSUFBSyxJQUFLLElBQUssS0FDN0RDLEVBQVksQ0FBQyxJQUFLLElBQUssSUFBSyxJQUFLLElBQUssSUFBSyxJQUFLLElBQUssSUFBSyxNQUNoRSxJQUFLLElBQUlDLEdBQUssRUFBR0EsRUFITyxHQUdjQSxJQUNwQyxJQUFLLElBQUlDLEdBQUssRUFBR0EsRUFKSyxHQUlnQkEsSUFDcEMsSUFBVyxJQUFQRCxFQUNGLElBQVcsSUFBUEMsRUFBVSxDQUNaLE1BQU1DLEVBQThCQyxTQUFTQyxjQUFjLE9BQzNERixFQUE0QkcsVUFBVUMsSUFBSSxtQkFDMUNKLEVBQTRCSyxNQUFNQyxXQUFhLFNBQy9DWCxFQUFhWSxZQUFZUCxFQUMzQixLQUFPLENBQ0wsTUFBTVEsRUFBcUJQLFNBQVNDLGNBQWMsT0FDbERNLEVBQW1CTCxVQUFVQyxJQUFJLG1CQUNqQ0ksRUFBbUJDLFlBQWNiLEVBQWFHLEdBQzlDSixFQUFhWSxZQUFZQyxFQUMzQixNQUNLLElBQVcsSUFBUFQsRUFBVSxDQUNuQixNQUFNVyxFQUFrQlQsU0FBU0MsY0FBYyxPQUMvQ1EsRUFBZ0JQLFVBQVVDLElBQUksbUJBQzlCTSxFQUFnQkQsWUFBY1osRUFBVUMsR0FDeENILEVBQWFZLFlBQVlHLEVBQzNCLEtBQU8sQ0FDTCxNQUFNQyxFQUFjVixTQUFTQyxjQUFjLFVBQzNDUyxFQUFZQyxhQUFhLFVBQVdkLEdBQ3BDYSxFQUFZQyxhQUFhLGFBQWNiLEdBQ3ZDWSxFQUFZUixVQUFVQyxJQUFJLGtCQUUxQlQsRUFBYVksWUFBWUksRUFDM0IsQ0FFSixFQVFGLE1BQU8sQ0FDTEUsbUJBUHlCLEtBQ3pCLE1BQU1DLEVBQTBCYixTQUFTYyxjQUFjLGlCQUNqREMsRUFBdUJmLFNBQVNjLGNBQWMsbUJBQ3BEckIsRUFBaUJvQixHQUNqQnBCLEVBQWlCc0IsRUFBcUIsRUFLekMsRUE1Q3FCLEdDRVJILG9CIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwLy4vc3JjL0RPTV9jb250cm9sbGVyLmpzIiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBET01Db250cm9sbGVyID0gKCgpID0+IHtcbiAgY29uc3QgY3JlYXRlQm9hcmRDZWxscyA9IChnYW1lYm9hcmRET00pID0+IHtcbiAgICBjb25zdCBCT0FSREFYRVNMRU5HVEggPSAxMDtcbiAgICBjb25zdCBjb2x1bW5MYWJlbHMgPSBbXCJBXCIsIFwiQlwiLCBcIkNcIiwgXCJEXCIsIFwiRVwiLCBcIkZcIiwgXCJHXCIsIFwiSFwiLCBcIklcIiwgXCJKXCJdO1xuICAgIGNvbnN0IHJvd0xhYmVscyA9IFtcIjFcIiwgXCIyXCIsIFwiM1wiLCBcIjRcIiwgXCI1XCIsIFwiNlwiLCBcIjdcIiwgXCI4XCIsIFwiOVwiLCBcIjEwXCJdO1xuICAgIGZvciAobGV0IGkgPSAtMTsgaSA8IEJPQVJEQVhFU0xFTkdUSDsgaSsrKSB7XG4gICAgICBmb3IgKGxldCBqID0gLTE7IGogPCBCT0FSREFYRVNMRU5HVEg7IGorKykge1xuICAgICAgICBpZiAoaSA9PT0gLTEpIHtcbiAgICAgICAgICBpZiAoaiA9PT0gLTEpIHtcbiAgICAgICAgICAgIGNvbnN0IGludmlzaWJsZVBsYWNlaG9sZGVyRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgICAgICBpbnZpc2libGVQbGFjZWhvbGRlckVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImdhbWVib2FyZC1sYWJlbFwiKTtcbiAgICAgICAgICAgIGludmlzaWJsZVBsYWNlaG9sZGVyRWxlbWVudC5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcbiAgICAgICAgICAgIGdhbWVib2FyZERPTS5hcHBlbmRDaGlsZChpbnZpc2libGVQbGFjZWhvbGRlckVsZW1lbnQpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBjb2x1bW5MYWJlbEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAgICAgY29sdW1uTGFiZWxFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJnYW1lYm9hcmQtbGFiZWxcIik7XG4gICAgICAgICAgICBjb2x1bW5MYWJlbEVsZW1lbnQudGV4dENvbnRlbnQgPSBjb2x1bW5MYWJlbHNbal07XG4gICAgICAgICAgICBnYW1lYm9hcmRET00uYXBwZW5kQ2hpbGQoY29sdW1uTGFiZWxFbGVtZW50KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoaiA9PT0gLTEpIHtcbiAgICAgICAgICBjb25zdCByb3dMYWJlbEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAgIHJvd0xhYmVsRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiZ2FtZWJvYXJkLWxhYmVsXCIpO1xuICAgICAgICAgIHJvd0xhYmVsRWxlbWVudC50ZXh0Q29udGVudCA9IHJvd0xhYmVsc1tpXTtcbiAgICAgICAgICBnYW1lYm9hcmRET00uYXBwZW5kQ2hpbGQocm93TGFiZWxFbGVtZW50KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zdCBjZWxsRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgICAgICAgY2VsbEVsZW1lbnQuc2V0QXR0cmlidXRlKFwiZGF0YVJvd1wiLCBpKTtcbiAgICAgICAgICBjZWxsRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJkYXRhQ29sdW1uXCIsIGopO1xuICAgICAgICAgIGNlbGxFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJnYW1lYm9hcmQtY2VsbFwiKTtcbiAgICAgICAgICAvLyBzb21lIGNsaWNrIGV2ZW50IGxpc3RlbmVyIHdoZXJlIGF0dGFjayBpcyBtYWRlIE9SIHByaW9yIHRvIHRoYXQsIHBsYWNpbmcgc2hpcCBvbiB0aGF0IGNlbGxcbiAgICAgICAgICBnYW1lYm9hcmRET00uYXBwZW5kQ2hpbGQoY2VsbEVsZW1lbnQpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9O1xuICBjb25zdCBpbml0aWFsaXplQm9hcmRET00gPSAoKSA9PiB7XG4gICAgY29uc3QgaHVtYW5QbGF5ZXJHYW1lYm9hcmRET00gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBsYXllci1ib2FyZFwiKTtcbiAgICBjb25zdCBvcHBvbmVudEdhbWVib2FyZERPTSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIub3Bwb25lbnQtYm9hcmRcIik7XG4gICAgY3JlYXRlQm9hcmRDZWxscyhodW1hblBsYXllckdhbWVib2FyZERPTSk7XG4gICAgY3JlYXRlQm9hcmRDZWxscyhvcHBvbmVudEdhbWVib2FyZERPTSk7XG4gIH07XG4gIHJldHVybiB7XG4gICAgaW5pdGlhbGl6ZUJvYXJkRE9NLFxuICB9O1xufSkoKTtcblxuZXhwb3J0IHsgRE9NQ29udHJvbGxlciB9O1xuIiwiaW1wb3J0IHsgRE9NQ29udHJvbGxlciB9IGZyb20gXCIuL0RPTV9jb250cm9sbGVyXCI7XG5cbkRPTUNvbnRyb2xsZXIuaW5pdGlhbGl6ZUJvYXJkRE9NKCk7XG4iXSwibmFtZXMiOlsiY3JlYXRlQm9hcmRDZWxscyIsImdhbWVib2FyZERPTSIsImNvbHVtbkxhYmVscyIsInJvd0xhYmVscyIsImkiLCJqIiwiaW52aXNpYmxlUGxhY2Vob2xkZXJFbGVtZW50IiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NMaXN0IiwiYWRkIiwic3R5bGUiLCJ2aXNpYmlsaXR5IiwiYXBwZW5kQ2hpbGQiLCJjb2x1bW5MYWJlbEVsZW1lbnQiLCJ0ZXh0Q29udGVudCIsInJvd0xhYmVsRWxlbWVudCIsImNlbGxFbGVtZW50Iiwic2V0QXR0cmlidXRlIiwiaW5pdGlhbGl6ZUJvYXJkRE9NIiwiaHVtYW5QbGF5ZXJHYW1lYm9hcmRET00iLCJxdWVyeVNlbGVjdG9yIiwib3Bwb25lbnRHYW1lYm9hcmRET00iXSwic291cmNlUm9vdCI6IiJ9