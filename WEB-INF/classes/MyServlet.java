package yue.j2ee.servlet;

import javax.servlet.*;
import javax.servlet.http.*;
import java.io.*;
 
// C:\apache\webapps\JWebDemo\WEB-INF\classes>javac -cp C:\apache\lib\servlet-api.jar -d . MyServlet.java
public class MyServlet extends HttpServlet{
	 
	public void service(HttpServletRequest req,HttpServletResponse res)throws ServletException,IOException{
//		System.out.println("wutongyue");
		// res.getWriter().write("hello");
		// TODO Auto-generated method stub
		 String index=req.getParameter("index");
		 FileReader js_url=null;
		 BufferedReader br_js=null;
		 PrintWriter pw=null;
		 String path=this.getServletContext().getRealPath("");
		 
		 try{
		 	synchronized(this){
		 		js_url=new FileReader(path+"FPMain/home/js/home_yue_car_index"+index+".json");
		 	}
			// res.getWriter().write(path+"FPMain/home/js/home_yue_car_index"+index+".json");
			br_js=new BufferedReader(js_url);
			String str_js="";
			String str="";
	/**
	 * —≠ª∑∂¡»°
	 */
			while((str_js=br_js.readLine())!=null) {
				str+=str_js+"\r\n";
			}
			pw=res.getWriter();
			pw.print(str);
			pw.flush();
		
		} catch (Exception e) {
			e.printStackTrace();
			// res.getWriter().write(e.toString());
		}finally {
			try {
				js_url.close();
				br_js.close();
				pw.close();
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
	}
}
