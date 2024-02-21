namespace Service1.Service;

public class DataService
{
    public static List<string> FarveListe = new List<string>();
 
    
    public  void GemteFarver()
    {
        FarveListe.Add("Rød");
        FarveListe.Add("Gul");
        FarveListe.Add("Grøn");
        FarveListe.Add("Rød");
        FarveListe.Add("Gul");
        FarveListe.Add("Grøn");
        FarveListe.Add("Rød");
        FarveListe.Add("Gul");
        FarveListe.Add("Grøn");
        
    }

    public  void tilFøjFarve(string farve)
    {
        FarveListe.Add(farve);
    }

   
    public List<string> sendList()
    {
        return FarveListe;
    }
    
    
    
    
    
}