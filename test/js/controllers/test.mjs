export const solution = (brown, yellow)=>{
  let answer = [0,0];
  const total = brown + yellow
  let a,b;
  for(let i=1; i<=total; i++){
    if(total%i==0){
      a=i
      b=total/i
      if((a-2)*(b-2)==yellow){
        answer[0]=Math.max(a,b)
        answer[1]=Math.min(a,b)
      }
    }
  }
  return answer;
}
