<?php
class Db
{
	/**
	 * @var PDO Databázové spojení
	 */
	private static $connection;

	/**
	 * @var array Výchozí nastavení ovladače
	 */
	private static $options = array(
		PDO::ATTR_ERRMODE => PDO::ERRMODE_WARNING,
		PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8",
		PDO::ATTR_EMULATE_PREPARES => false,
	);

	/**
	 * Připojí se k databázi pomocí daných údajů
	 * @param string $host Název hostitele
	 * @param string $database Název databáze
	 * @param string $user Uživatelské jméno
	 * @param string $password Heslo
	 */
	public static function connect($host, $database, $user, $password)
	{
		if (!isset(self::$connection)) {
			$dsn = "mysql:host=$host;dbname=$database";
			self::$connection = new PDO($dsn, $user, $password, self::$options);
		}
	}

	/**
	 * Spustí dotaz a vrátí PDO statement
	 * @param array $params Pole, kde je prvním prvkem dotaz a dalšími jsou parametry
	 * @return \PDOStatement PDO statement
	 */
	private static function executeStatement($params)
	{
		$query = array_shift($params);
		$statement = self::$connection->prepare($query);
		$statement->execute($params);
		return $statement;
	}

	/**
	 * Spustí dotaz a vrátí počet ovlivněných řádků. Dále se předá libovolný počet dalších parametrů.
	 * @param string $query Dotaz
	 * @return int Počet ovlivněných řádků
	 */
	public static function query($query) {
		$statement = self::executeStatement(func_get_args());
		return $statement->rowCount();
	}

	/**
	 * Spustí dotaz a vrátí z něj první sloupec prvního řádku. Dále se předá libovolný počet dalších parametrů.
	 * @param string $query Dotaz
	 * @return mixed Hodnota prvního sloupce z prvního řádku
	 */
	public static function querySingle($query) {
		$statement = self::executeStatement(func_get_args());
		$data = $statement->fetch();
		return $data[0];
	}

	/**
	 * Spustí dotaz a vrátí z něj první řádek. Dále se předá libovolný počet dalších parametrů.
	 * @param string $query Dotaz
	 * @return mixed Pole výsledků nebo false při neúspěchu
	 */
	public static function queryOne($query) {
		$statement = self::executeStatement(func_get_args());
		return $statement->fetch(PDO::FETCH_ASSOC);
	}

	/**
	 * Spustí dotaz a vrátí všechny jeho řádky jako pole asociativních polí. Dále se předá libovolný počet dalších parametrů.
	 * @param string $query Dotaz
	 * @return mixed Pole řádků enbo false při neúspěchu
	 */
	public static function queryAll($query) {
		$statement = self::executeStatement(func_get_args());
		return $statement->fetchAll(PDO::FETCH_ASSOC);
	}

	/**
	 * Umožňuje snadné vložení záznamu do databáze pomocí asociativního pole
	 * @param string $table Název tabulky
	 * @param array $data Asociativní pole, kde jsou klíče sloupce a hodnoty hodnoty
	 * @return int Počet ovlivněných řádků
	 */
	public static function insert($table, $data) {
		$keys = array_keys($data);
		self::checkIdentifiers(array($table) + $keys);
		$query = "
			INSERT INTO `$table` (`" . implode('`, `', $keys) . "`)
			VALUES (" . str_repeat('?,', count($data) - 1) . "?)
		";
		$params = array_merge(array($query), array_values($data));
		$statement = self::executeStatement($params);
		return $statement->rowCount();
	}

	/**
	 * Umožňuje snadnou modifikaci záznamu v databázi pomocí asociativního pole
	 * @param string $table Název tabulky
	 * @param array $data Asociativní pole, kde jsou klíče sloupce a hodnoty hodnoty
	 * @param string $condition Řetězec s SQL podmínkou (WHERE)
	 * @return mixed
	 */
	public static function update($table, $data, $condition) {
		$keys = array_keys($data);
		self::checkIdentifiers(array($table) + $keys);
		$query = "
			UPDATE `$table` SET `".
			implode('` = ?, `', array_keys($data)) . "` = ?
			$condition
		";
		$params = array_merge(array($query), array_values($data), array_slice(func_get_args(), 3));
		$statement = self::executeStatement($params);
		return $statement->rowCount();
	}

	/**
	 * Vrátí poslední ID posledního záznamu vloženého pomocí INSERT
	 * @return mixed Id posledního záznamu
	 */
	public static function getLastId()
	{
		return self::$connection->lastInsertId();
	}

	/**
	 * Ošetří string proti SQL injekci
	 * @param string $string Řetězec
	 * @return mixed Ošetřený řetězec
	 */
	public static function quote($string)
	{
		return self::$connection->quote($string);
	}

	/**
	 * Zkontroluje, zda identifikátory odpovídají formátu identifikátorů
	 * @param array $identifiers Pole identifikátorů
	 * @throws \Exception
	 */
	private static function checkIdentifiers($identifiers)
	{
		foreach ($identifiers as $identifier)
		{
			if (!preg_match('/^[a-zA-Z0-9\_\-]+$/u', $identifier))
				throw new Exception('Dangerous identifier in SQL query');
		}
	}
}