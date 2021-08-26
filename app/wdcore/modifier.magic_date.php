<?php
/**
 * Smarty plugin
 *
 * @package    Smarty
 * @subpackage PluginsModifier
 */
/**
 * Smarty date_format modifier plugin
 * Type:     modifier
 * Name:     date_format
 * Purpose:  format datestamps via strftime
 * Input:
 *          - string: input date string
 *          - format: strftime format for output
 *          - default_date: default date if $string is empty
 *
 * @link   http://www.smarty.net/manual/en/language.modifier.date.format.php date_format (Smarty online manual)
 * @author Monte Ohrt <monte at ohrt dot com>
 *
 * @param string $string       input date string
 * @param string $format       strftime format for output
 * @param string $default_date default date if $string is empty
 * @param string $formatter    either 'strftime' or 'auto'
 *
 * @return string |void
 * @uses   smarty_make_timestamp()
 */
function smarty_modifier_magic_date($string, $format = null, $default_date = '', $formatter = 'auto')
{
    if ($format === null) {
        $format = Smarty::$_DATE_FORMAT;
    }
    /**
     * require_once the {@link shared.make_timestamp.php} plugin
     */
    static $is_loaded = false;
    if (!$is_loaded) {
        if (!is_callable('smarty_make_timestamp')) {
            include_once SMARTY_PLUGINS_DIR . 'shared.make_timestamp.php';
        }
        $is_loaded = true;
    }
    if ($string !== '' && $string !== '0000-00-00' && $string !== '0000-00-00 00:00:00') {
        $timestamp = smarty_make_timestamp($string);
    } elseif ($default_date !== '') {
        $timestamp = smarty_make_timestamp($default_date);
    } else {
        return;
    }
    if ($formatter === 'strftime' || ($formatter === 'auto' && strpos($format, '%') !== false)) {
        if (Smarty::$_IS_WINDOWS) {
            $_win_from = array(
                '%D',
                '%h',
                '%n',
                '%r',
                '%R',
                '%t',
                '%T'
            );
            $_win_to = array(
                '%m/%d/%y',
                '%b',
                "\n",
                '%I:%M:%S %p',
                '%H:%M',
                "\t",
                '%H:%M:%S'
            );
            if (strpos($format, '%e') !== false) {
                $_win_from[] = '%e';
                $_win_to[] = sprintf('%\' 2d', date('j', $timestamp));
            }
            if (strpos($format, '%l') !== false) {
                $_win_from[] = '%l';
                $_win_to[] = sprintf('%\' 2d', date('h', $timestamp));
            }
            $format = str_replace($_win_from, $_win_to, $format);
			$date_str = strftime($format, $timestamp);
			$locale = component_core_language::$locale;
			if (stripos($locale, "1251") !== false) {
				$date_str = iconv("windows-1251","utf-8", $date_str);
			} elseif (stripos($locale, "1252") !== false) {
				$date_str = iconv("windows-1252","utf-8", $date_str);
			}
			return $date_str;
        }
        else {
			return strftime($format, $timestamp);
		}
    } else {
        return date($format, $timestamp);
    }
}