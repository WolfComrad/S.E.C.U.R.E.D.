using System.Globalization;
using System.Security.Cryptography;
using WpfSerpent.Source.Models;

public class Program
{
    public static void Main(string[] args)
    {

		var path = "C:\\Users\\kodyc\\Source\\Repos\\Serpent\\Serpent\\SimpleMessenger\\Files\\message.txt";
		var pathToDecrypt = "C:\\Users\\kodyc\\Source\\Repos\\Serpent\\Serpent\\SimpleMessenger\\Files\\message.serpent";

        WriteToFile(path, "Hello how are you today?");


		SerpentCipher cipher = new SerpentCipher();
		var key = RandomizeKey();
		Console.WriteLine(key.ToString());

		cipher.Encrypt(path, key, 32, (Mode)1, 0);

		using var  writer = new StreamWriter(path);
		writer.WriteLine("");
		writer.Close();

		cipher.Decrypt(pathToDecrypt, key, 32, (Mode)1,0);

    }


	public static byte[] RandomizeKey()
	{
        var key = new byte[32];
		RandomNumberGenerator rng = RandomNumberGenerator.Create();
        rng.GetNonZeroBytes(key);
        return key;
    }


    public static void WriteToFile(string filePath, string message)
    {
		try
		{
			using StreamWriter streamWriter = new StreamWriter(filePath);
			streamWriter.WriteLine(message);
		}
		catch (Exception ex)
		{

			Console.WriteLine(ex.ToString());
		}
    }
}