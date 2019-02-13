package yue.j2ee.servlet;
import javax.servlet.*;
import javax.servlet.http.*;
import java.io.*;

// C:\apache\webapps\JWebDemo\WEB-INF\classes>javac -cp C:\apache\lib\servlet-api.jar -d . MyServlet.java
public class MyServlety extends HttpServlet{
	 
	public void service(HttpServletRequest req,HttpServletResponse res)throws ServletException,IOException{
//		System.out.println("wutongyue");
		// res.getWriter().write("hello");
		 String index=req.getParameter("index");
		 FileReader js_url=null;
		 BufferedReader br_js=null;
		 PrintWriter pw=null;
		  String path=this.getServletContext().getRealPath("");
		 try {
 			// 加锁
     		synchronized(this){
     			js_url=new FileReader(path+"FPMain/home/js/js-css-html.json");
     		}
			br_js=new BufferedReader(js_url);
			String str_js="";
			String str="";
//			循环读取
			while((str_js=br_js.readLine())!=null) {
				str+=str_js+"\r\n";
//				System.out.println(str);
			}
//			System.out.println(str);
			pw=res.getWriter();
			pw.print(str);
			pw.flush();
		
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}finally {
			try {
				js_url.close();
				br_js.close();
				pw.close();
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
	}
}
