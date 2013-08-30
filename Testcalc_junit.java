
//import junit.framework.*;
import static org.junit.Assert.assertEquals;

import org.junit.Test;
import java.io.IOException;

public class Testcalc4
{
/*
@Before
	public void setUP()
	{
System.out.println("This is setup");

	}
*/
@Test
	public void AddP() throws IOException
		{
		Calculator obj = new Calculator();	
		assertEquals(5, obj.add(2,3));
		//assertEquals(6, obj.add(2,3));
		}
@Test
	public void AddN() throws IOException
		{
	    Calculator obj = new Calculator();
		assertEquals(-5, obj.add(-2,-3));

		}
@Test
	public void AddNP() throws IOException
		{
	   Calculator obj = new Calculator();	
		assertEquals(1, obj.add(-2,3));

		}
@Test
public void subtractP() throws IOException
	{
	Calculator obj = new Calculator();	
	assertEquals(1, obj.subtract(5,4));
	//assertEquals(6, obj.add(2,3));
	}
@Test
public void subtractPs() throws IOException
	{
	Calculator obj = new Calculator();	
	assertEquals(1, obj.subtract(4,5));
	//assertEquals(6, obj.add(2,3));
	}
@Test
public void subtractPe() throws IOException
	{
	Calculator obj = new Calculator();	
	assertEquals(0, obj.subtract(4,4));
	//assertEquals(6, obj.add(2,3));
	}
@Test
public void subtractN() throws IOException
	{
    Calculator obj = new Calculator();
	assertEquals(-2, obj.subtract(-5,-3));

	}
@Test
public void subtractNP() throws IOException
	{
   Calculator obj = new Calculator();	
	assertEquals(-5, obj.add(-2,3));
	}
@Test
public void subtractPN() throws IOException
	{
   Calculator obj = new Calculator();	
	assertEquals(5, obj.add(3,-2));
	}
@Test
public void multiplyP() throws IOException
	{
	Calculator obj = new Calculator();	
	assertEquals(20, obj.multiply(5,4));
	//assertEquals(6, obj.add(2,3));
	}
@Test
public void multiplyN() throws IOException
	{
    Calculator obj = new Calculator();
	assertEquals(15, obj.multiply(-5,-3));

	}
@Test
public void multiplyNP() throws IOException
	{
   Calculator obj = new Calculator();	
	assertEquals(-6, obj.multiply(-2,3));
	}
@Test
public void multiplyPN() throws IOException
	{
   Calculator obj = new Calculator();	
	assertEquals(-6, obj.multiply(3,-2));
	}
@Test
public void multiply0() throws IOException
	{
   Calculator obj = new Calculator();	
	assertEquals(0, obj.multiply(3,0));
	}
@Test
public void multiply0n() throws IOException
	{
   Calculator obj = new Calculator();	
	assertEquals(0, obj.multiply(-3,0));
	}
@Test
public void divideP() throws IOException
	{
	Calculator obj = new Calculator();	
	assertEquals(1, obj.divide(5,4));
	//assertEquals(6, obj.add(2,3));
	}
@Test
public void divideN() throws IOException
	{
    Calculator obj = new Calculator();
	assertEquals(1, obj.divide(-5,-3));

	}
@Test
public void divideNP() throws IOException
	{
   Calculator obj = new Calculator();	
	assertEquals(-1, obj.divide(-3,3));
	}
@Test
public void dividePN() throws IOException
	{
   Calculator obj = new Calculator();	
	assertEquals(-2, obj.divide(4,-2));
	}

@Test
public void divideby0() throws IOException
	{
   Calculator obj = new Calculator();	
	assertEquals(0, obj.divide(3,0));
	}
@Test
public void divideby0n() throws IOException
	{
   Calculator obj = new Calculator();	
	assertEquals(0, obj.divide(-3,0));
	}
/*
@After
	public void tearDown()
	{
System.out.println("This is tearDown");
	}
*/

}

//By inheriting the TestCase, methods like assertEquals are available for use
//Assert can throw exception and hence throws exception should be called
